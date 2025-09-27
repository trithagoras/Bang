using Bang.Core.Modules.Codes;

namespace Bang.Core.Modules.Messages;
public class MessageService(ICodeService codeService) : IMessageService {

    private readonly Dictionary<string, (string message, DateTime timestamp)> store = [];
    private readonly TimeSpan expiryTime = TimeSpan.FromMinutes(10);

    public async Task<string> SendMessageAsync(string message, CancellationToken ct = default) {
        var code = await codeService.GenerateCode();
        store[code] = (message, DateTime.UtcNow);

        _ = new Timer(state => {
            try {
                store.Remove(code);
            } catch (KeyNotFoundException) {
                // code has already been retrieved
            }
        }, null, expiryTime, Timeout.InfiniteTimeSpan);

        return code;
    }

    public Task<string> ReceiveMessageAsync(string code, CancellationToken ct = default) {
        if (store.TryGetValue(code, out var data)) {
            // Remove the message once it's retrieved
            store.Remove(code);
            return Task.FromResult(data.message);
        }

        throw new KeyNotFoundException("Code not found or expired.");
    }
}
