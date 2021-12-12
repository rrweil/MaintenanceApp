using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RazorHtmlEmails.RazorClassLib.Views.Emails.ConfirmAccount
{
    public class ConfirmAccountEmailViewModel
    {
        public ConfirmAccountEmailViewModel(string confirmEmailUrl)
        {
            ConfirmEmailUrl = confirmEmailUrl;
        }

        public string ConfirmEmailUrl { get; set; }
    }
}
