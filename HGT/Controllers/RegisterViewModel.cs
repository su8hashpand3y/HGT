using System.ComponentModel.DataAnnotations;

namespace HGT.Controllers
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string CapthaName { get; set; }
        [Required]
        public string CapthaAnswer { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string District { get; set; }

        [Required]
        public string Town { get; set; }
    }
}