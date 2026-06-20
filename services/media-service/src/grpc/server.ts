import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createLogger } from "@cleannation/shared-utils"
import {
  getVerificationStatus,
  batchGetVerificationStatus,
  triggerVerification,
} from "./handlers"
import { config } from "../config/index"

const logger = createLogger("media-service")

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve proto file path — works whether running from src/ or dist/
const PROTO_PATH = path.resolve(__dirname, "../../proto/media.proto")

export async function startGrpcServer(): Promise<grpc.Server> {
  // Load the .proto file at runtime
  // protoLoader reads the file and creates descriptor objects
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,         // Preserve field names as in .proto (snake_case)
    longs: String,          // Convert int64 to string (JS number precision)
    enums: String,          // Convert enums to string names
    defaults: true,         // Set default values for missing fields
    oneofs: true,           // Support oneof fields
  })

  // Load the package definition into a gRPC object
  const proto = grpc.loadPackageDefinition(packageDefinition)

  // Access the media package — matches "package media;" in .proto
  const mediaProto = (proto as Record<string, unknown>)["media"] as {
    MediaVerification: grpc.ServiceClientConstructor
  }

  const server = new grpc.Server({
    // Channel options — tune for service-to-service communication
    "grpc.max_receive_message_length": 4 * 1024 * 1024,  // 4MB max message
    "grpc.max_send_message_length": 4 * 1024 * 1024,
    // Keepalive — detects dead connections between services
    "grpc.keepalive_time_ms": 30_000,
    "grpc.keepalive_timeout_ms": 5_000,
    "grpc.keepalive_permit_without_calls": 1,
  })

  // Register service implementation
  // This maps .proto method names to our handler functions
  server.addService(  
    mediaProto.MediaVerification.service,
    {
      GetVerificationStatus: getVerificationStatus,
      BatchGetVerificationStatus: batchGetVerificationStatus,
      TriggerVerification: triggerVerification,
    }
  )

  // Start the server
  await new Promise<void>((resolve, reject) => {
    server.bindAsync(
      `${config.host}:${config.grpcPort}`,
      // Insecure credentials — traffic is over private Kubernetes network
      // In production, use TLS with certificates from cert-manager
      grpc.ServerCredentials.createInsecure(),
      (error, port) => {
        if (error !== null) {
          reject(error)
          return
        }
        logger.info(
          { port },
          "gRPC server listening"
        )
        resolve()
      }
    )
  })

  return server
}