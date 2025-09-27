namespace Bang.Core.Modules.Messages;
public interface IMessageService {
    Task<string> SendMessageAsync(string message, CancellationToken ct = default);
    Task<string> ReceiveMessageAsync(string code, CancellationToken ct = default);
}
