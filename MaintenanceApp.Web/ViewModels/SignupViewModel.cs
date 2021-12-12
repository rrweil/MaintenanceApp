using MaintenanceApp.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MaintenanceApp.Web.ViewModels
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }
    }
}
