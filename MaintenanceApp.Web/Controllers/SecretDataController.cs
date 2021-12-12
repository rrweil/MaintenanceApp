using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MaintenanceApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SecretDataController : ControllerBase
    {
        [HttpGet]
        [Route("get")]
        public object GetSecretData()
        {
            return new
            {
                randomNumber = new Random().Next(1, 10000)
            };
        }

        [HttpGet]
        [Route("anyone")]
        [AllowAnonymous]
        public object GetPublicData()
        {

            return new
            {
                message = "Testing"
            };
        }
    }
}
