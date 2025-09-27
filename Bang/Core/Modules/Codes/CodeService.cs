namespace Bang.Core.Modules.Codes;
public class CodeService : ICodeService {
    private readonly Random random = new();

    public Task<string> GenerateCode() {
        var word = Words.AllWords[random.Next(Words.AllWords.Length)].ToUpper();
        return Task.FromResult(word);
    }
}
