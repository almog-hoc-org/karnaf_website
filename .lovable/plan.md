

# תיקון שגיאות באתר

## שגיאה קריטית: CurriculumAccordion.tsx שורה 69

הסילבוס (`curriculum.ts`) מכיל שיעורים מסוג `"tool"`, אבל מפת האייקונים (`lessonTypeIcon`) ומפת הצבעים (`lessonTypeColor`) לא מכילות ערך עבור `"tool"`. כתוצאה מכך, `Icon` הוא `undefined` ו-React זורק שגיאה.

### תיקון

**curriculum.ts** — הוספת `"tool"` לטיפוס `Lesson.type`:
```typescript
type: "video" | "document" | "quiz" | "tool";
```
(כבר קיים — תקין)

**CurriculumAccordion.tsx** — הוספת `"tool"` למפות:
- ייבוא אייקון `Wrench` מ-lucide-react
- הוספה ל-`lessonTypeIcon`: `tool: Wrench`
- הוספה ל-`lessonTypeColor`: `tool: "text-orange-400 bg-orange-400/10"`

זה יתקן את השגיאה בקונסול ויציג את כל שיעורי הכלים בצורה תקינה.

---

## קבצים שיושפעו

| קובץ | שינוי |
|-------|-------|
| CurriculumAccordion.tsx | הוספת אייקון וצבע ל-type "tool" |

