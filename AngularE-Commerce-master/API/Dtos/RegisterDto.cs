using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
    //    [RegularExpression("^[a-zA-Z]\\w{3,14}$",ErrorMessage ="Şifreniz hatalı biçimdedir")]
        public string Password { get; set; }
    }
}
