using API.Core.DbModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Infrastructure.DataContext
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Furkan",
                    Email ="kldhfwleık@com.tr",
                    UserName = "furkan",
                    Address = new Address
                    {
                        FirstName ="Furkan",
                        LastName ="Demirdesen",
                        Street = "Nadide",
                        City =   "İstanbul",
                        State = "TR",
                        ZipCode = "34000"
                    }
                };
                await userManager.CreateAsync(user,"Admin*123");
            }

        }
    }
}
