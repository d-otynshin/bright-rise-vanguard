import preferencesData from "@/constants/preferences_localization copy.json";
import {categoryMapping} from "@/constants/categories.ts";

export const createQuestions = (selectedType: string, selectedLanguage: string) => {
    const questionsForTypeAndLang = preferencesData[selectedType]?.[selectedLanguage];
    if (!questionsForTypeAndLang) return [];

    return Object.keys(questionsForTypeAndLang).map(id => {
        const questionId = parseInt(id);
        let category: 'R' | 'A' | 'I' | 'S' | 'E' | 'C' = 'R'; // Default category, will be updated

        // Find the category for the current question ID based on the mapping (only for secondary)
        if (selectedType === 'secondary') {
            for (const catKey in categoryMapping) {
                const shortCat = catKey.charAt(0).toUpperCase() as 'R' | 'A' | 'I' | 'S' | 'E' | 'C';
                if (categoryMapping[catKey].includes(questionId)) {
                    category = shortCat;
                    break;
                }
            }
        } else {
            // TODO: Implement category mapping for primary questions if needed
            // For now, assigning 'C' as a placeholder for primary questions
            category = 'C';
        }


        return {
            id: questionId,
            text: questionsForTypeAndLang[id],
            category: category // Assign the determined category
        };
    });
}