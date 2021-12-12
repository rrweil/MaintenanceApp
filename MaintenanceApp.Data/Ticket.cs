using System;
using System.Collections.Generic;
using System.Text;

namespace MaintenanceApp.Data
{
    public class Ticket
    {
        public int Id { get; set;  }
        public DateTime Timestamp { get; set; }
        public string Issue { get; set; }
        public string RoomLocation { get; set; }
        public Location Location { get; set; }
        public string Comments { get; set;  }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool Completed{ get; set; }
    }
}
