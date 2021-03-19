window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
formbutton("create", {
  theme: "classic",
  title: "Contact me",
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
    value: "New submission!",
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    required: true,
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
    name: "Message",
    type: "textarea",
  },
  {
    name: "Submit",
    type: "submit",
    value: "Submit Form",
  }],
  action: "https://formspree.io/xpzogzdn",
  buttonImg: "<i class='fas fa-comments' style='font-size:24px'/>",
})
