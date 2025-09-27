using Bang.Core.Modules.Messages;
using Microsoft.AspNetCore.Mvc;

namespace Bang.Api.Controllers; 
[ApiController]
[Route("api/[controller]")]
public class MessageController(IMessageService messageService) : ControllerBase {

    [HttpPost]
    public async Task<IActionResult> PostMessage([FromBody] string message) {
        try {
            var code = await messageService.SendMessageAsync(message);
            return Ok(new { code });
        } catch (Exception ex) {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{code}")]
    public async Task<IActionResult> GetMessage(string code) {
        try {
            var message = await messageService.ReceiveMessageAsync(code);
            return Ok(new { message });
        } catch (KeyNotFoundException) {
            return NotFound(new { error = "Code not found or expired." });
        }
    }
}
