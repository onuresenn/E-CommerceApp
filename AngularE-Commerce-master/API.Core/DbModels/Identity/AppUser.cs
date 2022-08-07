using Microsoft.AspNetCore.Identity;

namespace API.Core.DbModels
{
    public class AppUser : IdentityUser
    {
        public string? DisplayName { get; set; }
        public Address Address { get; set; }
    }
}
