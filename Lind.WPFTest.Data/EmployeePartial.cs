using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lind.WPFTest.Data
{
    public partial class Employee
    {
        public string FullName { get { return string.Format("{0} {1}", this.FirstName, this.LastName); } }
    }
}
