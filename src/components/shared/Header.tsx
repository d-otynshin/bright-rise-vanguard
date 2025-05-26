import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  selectedLanguage: 'ru' | 'kz';
  selectedType: 'primary' | 'secondary';
  onLanguageChange: Dispatch<SetStateAction<'ru' | 'kz'>>;
  onTypeChange: Dispatch<SetStateAction<'primary' | 'secondary'>>;
  onResetToMain: () => void;
  maxWidth?: '4xl' | '5xl' | '6xl' | '7xl';
}

const Header = ({
  selectedLanguage,
  selectedType,
  onLanguageChange,
  onTypeChange,
  onResetToMain,
  maxWidth = '4xl'
}: HeaderProps) => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value as 'ru' | 'kz';
    onLanguageChange(lang);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value as 'primary' | 'secondary';
    onTypeChange(type);
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className={`max-w-${maxWidth} mx-auto flex items-center justify-between py-4`}>
          <div 
            onClick={onResetToMain}
            className="text-xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
          >
            Talpyn
          </div>

          <div className="flex items-center gap-4">
            <select 
              value={selectedLanguage} 
              onChange={handleLanguageChange} 
              className="border rounded p-2"
            >
              <option value="ru">Русский</option>
              <option value="kz">Қазақ</option>
            </select>

            <select 
              value={selectedType} 
              onChange={handleTypeChange} 
              className="border rounded p-2"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 