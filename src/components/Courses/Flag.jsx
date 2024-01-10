export default function Flag({ language }) {
  const baseUrl = "/images/flags/mini/";

  const lang = () => {
    if (!language) {
      return "us-mini.png";
    }
    switch (language.toLowerCase()) {
      case "english":
        return "us-mini.png";
        break;
      case "hindi":
        return "in-mini.png";
        break;
      case "spanish":
        return "es-mini.png";
        break;
      case "french":
        return "fr-mini.png";
        break;
      case "arabic":
        return "ar-mini.png";
        break;
      case "portuguese":
        return "br-mini.png";
        break;
      case "dutch":
        return "ru-mini.png";
        break;
      case "urdu":
        return "ur-mini.png";
        break;
      case "all":
        return "world.png";
        break;

      default:
        return "us-mini.png";
        break;
    }
  };

  const finalUrl = baseUrl + lang();

  return (
    <div className="img flag">
      <img src={finalUrl} alt="" />
    </div>
  );
}
