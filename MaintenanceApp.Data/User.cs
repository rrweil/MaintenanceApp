﻿using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace MaintenanceApp.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Role Role { get; set; }
        public Location Location { get; set; }
        
        [JsonIgnore]
        public List<Ticket> Tickets { get; set; }
    }
}
