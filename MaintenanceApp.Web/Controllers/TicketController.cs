using MaintenanceApp.Data;
using MaintenanceApp.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace MaintenanceApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TicketController : ControllerBase
    {
        private readonly string _connectionString;
        public TicketController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addTicket")]
        public void Signup(AddTicketViewModel vm)
        {
            var repo = new TicketRepository(_connectionString);
            var ticket = new Ticket
            {
                Timestamp = DateTime.Now,
                Issue = vm.Issue,
                RoomLocation = vm.RoomLocation,
                UserId = GetCurrentUser().Id,
                Location = GetCurrentUser().Location,
                Completed = false
            };
            repo.AddTicket(ticket);
        }

        [HttpPost]
        [Route("updateTicket")]
        public void UpdateTicket(UpdateTicketViewModel vm)
        {
            var repo = new TicketRepository(_connectionString);
            var ticket = new Ticket
            {
                Id = vm.Id,
                Issue = vm.Issue,
                RoomLocation = vm.RoomLocation,
                Location = GetCurrentUser().Location, 
                UserId = GetCurrentUser().Id
            };
            Console.WriteLine(ticket.Id);
            repo.UpdateTicket(ticket);
        }

        [HttpGet]
        [Route("GetTickets")]
        public List<Ticket> GetTickets(bool completedStatus)
        {
            var repo = new TicketRepository(_connectionString);
            var tickets = repo.GetTickets(completedStatus);
            return tickets;
        }


        [HttpGet]
        [Route("GetTicketsForLocation")]
        public List<Ticket> GetTicketsForLocation(bool completedStatus)
        {
            var repo = new TicketRepository(_connectionString);
            var location = GetCurrentUser().Location;
            var tickets = repo.GetTicketsForLocation(completedStatus, location);
            return tickets;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public List<User> GetAllUsers()
        {
            var repo = new UserRepository(_connectionString);
            return repo.GetAllUsers();
        }


        [HttpPost]
        [Route("MarkAsComplete")]
        public void MarkAsComplete(Ticket ticket)
        {
            var repo = new TicketRepository(_connectionString);
            repo.MarkAsComplete(ticket.Id);
        }

        [HttpGet]
        [Route("GetTicket")]
        public Ticket GetTicket(int id)
        {
            var repo = new TicketRepository(_connectionString);
            return repo.GetTicket(id);
        }

        private User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }

    }
}
