export function asyncHandler(handler) {
    return async function wrappedHandler(request, reply) {
        try {
            await handler(request, reply);
        }
        catch (error) {
            reply.send(error);
        }
    };
}
//# sourceMappingURL=asyncHandler.js.map