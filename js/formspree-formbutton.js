function loadFormbutton() {
  //
  // This is the function for showing the Formspree Formbutton
  //

  let subject = "New submission!";

  url_lang = window.location.search;
  if (url_lang == '?es') {
    var title = "Contáctame";
    var privacy_link = "<a href='privacy.html?es' target='_blank' style='width:100%;text-align:right;text-decoration:none;color:#842242;'>Política de privacidad</a>";
    var message = "Mensaje";
    var email = "Correo electrónico";
    var phone_number = "Número de teléfono";
    var submit_form = "Enviar formulario";
    if (document.title == 'Patty M Designs - 404') {
      var title = "Necesitas ayuda?";
      subject = "Site Problem!";
    }
  } else if (url_lang == '?fr') {
    var title = "Contactez moi";
    var privacy_link = "<a href='privacy.html?fr' target='_blank' style='width:100%;text-align:right;text-decoration:none;color:#842242;'>Politique de confidentialité</a>";
    var message = "Message";
    var email = "E-mail";
    var phone_number = "Numéro de téléphone";
    var submit_form = "Soumettre le formulaire";
    if (document.title == 'Patty M Designs - 404') {
      var title = "Besoin d'aide?";
      subject = "Site Problem!";
    }
  } else if (url_lang == '?de') {
    var title = "Kontaktiere mich";
    var privacy_link = "<a href='privacy.html?de' target='_blank' style='width:100%;text-align:right;text-decoration:none;color:#842242;'>Datenschutz-Bestimmungen</a>";
    var message = "Botschaft";
    var email = "Email";
    var phone_number = "Telefonnummer";
    var submit_form = "Formular senden";
    if (document.title == 'Patty M Designs - 404') {
      var title = "Brauchen Sie Hilfe?";
      subject = "Site Problem!";
    }
  } else {
    var title = "Contact me";
    var privacy_link = "<a href='privacy.html' target='_blank' style='width:100%;text-align:right;text-decoration:none;color:#842242;'>Privacy Policy</a>";
    var message = "Message";
    var email = "Email";
    var phone_number = "Phone Number";
    var submit_form = "Submit Form";
    if (document.title == 'Patty M Designs - 404') {
      var title = "Need help?";
      subject = "Site Problem!";
    }
  }

  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
  formbutton("create", {
    theme: "classic",
    title: title,
    description: privacy_link,
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
      name: message,
      type: "textarea",
    },
    {
      name: "email",
      type: "email",
      label: email,
      required: true,
    },
    {
      name: "phone number",
      type: "text",
      label: phone_number,
    },
    {
      name: "Submit",
      type: "submit",
      value: submit_form,
    }],
    action: "https://formspree.io/xpzogzdn",
    buttonImg: "<i class='fas fa-comments' style='font-size:24px'/>",
  })

}
loadFormbutton();
