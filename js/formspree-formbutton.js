//
// This is the function for showing the Formspree Formbutton
//

let title = "Contact me";
let subject = "New submission!";
if (document.title == 'Patty M Designs - 404') {
  title = "Need help?";
  subject = "Site Problem!";
}

window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
formbutton("create", {
  theme: "classic",
  title: title,
  description: "<a href='privacy.html' target='_blank' style='width:100%;text-align:right;text-decoration:none;color:#842242;'>Privacy Policy</a>",
  styles: {
    button: {
      background: "#842242"
    },
    title: {
      background: "#842242",
      letterSpacing: "0.05em",
      fontFamily:'"Courgette", cursive',
    },
  },
    fields: [
  {
    name: "_subject",
    type: "hidden",
    label: "",
    value: subject,
  },
  {
    name: "Message",
    type: "textarea",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
  },
  {
    name: "phone number",
    type: "text",
    label: "Phone Number",
  },
  {
    name: "Submit",
    type: "submit",
    value: "Submit Form",
  }],
  action: "https://formspree.io/xpzogzdn",
  buttonImg: "<i class='fas fa-comments' style='font-size:24px'/>",
})
