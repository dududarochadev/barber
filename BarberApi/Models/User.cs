using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BarberApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public int Username { get; set; }
        public int Password { get; set; }
        public int Role { get; set; }
    }
}