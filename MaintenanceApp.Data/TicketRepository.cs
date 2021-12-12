using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MaintenanceApp.Data
{
    public class TicketRepository
    {
        private readonly string _connectionString;

        public TicketRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddTicket(Ticket ticket)
        {
            var ctx = new MaintContext(_connectionString);
            ctx.Tickets.Add(ticket);
            ctx.SaveChanges();
        }

        public List<Ticket> GetTickets(bool completedStatus)
        {
            var ctx = new MaintContext(_connectionString);
            return ctx.Tickets
                .Include(t => t.User)
                .Include(t => t.Location)
                .Where(t => t.Completed == completedStatus).ToList();
        }

        public List<Ticket> GetTicketsForLocation(bool completedStatus, Location location)
        {
            var ctx = new MaintContext(_connectionString);
            return ctx.Tickets
                .Include(t => t.User)
                .Where(t => t.Completed == completedStatus && t.Location == location).ToList();
        }

        public void MarkAsComplete(int id)
        {
            var ctx = new MaintContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated(
                $"UPDATE Tickets SET Completed = 1 WHERE Id = {id}");
        }

        public Ticket GetTicket(int id)
        {
            var ctx = new MaintContext(_connectionString);
            return ctx.Tickets.FirstOrDefault(t => t.Id == id);
        }

        public void UpdateTicket(Ticket ticket)
        {
            using var ctx = new MaintContext(_connectionString);
            ctx.Tickets.Attach(ticket);
            ctx.Entry(ticket).State = EntityState.Modified;
            ctx.SaveChanges();
        }


    }
}
