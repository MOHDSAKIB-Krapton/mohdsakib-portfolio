import emailjs from "@emailjs/browser";

export default class EmailServices {
  static async sendEmails(name: string, email: string, message: string) {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID_OWNER!,
        templateParams,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      );

      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID_USER!,
        templateParams,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      );

      return true;
    } catch (err) {
      console.error("EmailJS Error:", err);
      return false;
    }
  }
}
