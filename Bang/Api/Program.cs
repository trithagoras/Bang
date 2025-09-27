
using Bang.Core.Modules.Codes;
using Bang.Core.Modules.Messages;

namespace Bang.Api; 
public class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddSingleton<ICodeService, CodeService>();
        builder.Services.AddSingleton<IMessageService, MessageService>();

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        var app = builder.Build();

        if (app.Environment.IsDevelopment()) {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.Urls.Add("http://0.0.0.0:80");

        app.MapControllers();

        app.Run();
    }
}
