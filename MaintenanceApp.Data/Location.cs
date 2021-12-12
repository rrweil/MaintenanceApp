using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Text.Json.Serialization;

namespace MaintenanceApp.Data
{
    public enum Location
    {
        JDBY, 
        YTT, 
        Nursery,
        [Description("Business Office")]
        BusinessOffice
    }
}
