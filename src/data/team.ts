import itamarPhoto from "@/assets/team/itamar.png";
import almogPhoto from "@/assets/team/almog.png";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const team: TeamMember[] = [
  {
    name: "איתמר",
    role: "מייסד שותף — אסטרטגיה והשקעות",
    bio: "מומחה לניתוח שוק הנדל\"ן עם ניסיון של למעלה מ-8 שנים בתחום. מוביל את אסטרטגיית ההשקעות ומלווה לקוחות פרימיום ברכישת נכסים.",
    image: itamarPhoto,
  },
  {
    name: "אלמוג",
    role: "מייסד שותף — חינוך והכשרה",
    bio: "מפתח את התוכנית הדיגיטלית \"הדרך לדירה\" ואחראי על תוכן ההכשרה. מאמין שידע פיננסי הוא הכלי החזק ביותר של רוכש דירה.",
    image: almogPhoto,
  },
];
