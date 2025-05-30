
import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLanguageChange = (value: 'ru' | 'kz') => {
    onLanguageChange(value);
  };

  const handleTypeChange = (value: 'primary' | 'secondary') => {
    onTypeChange(value);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className={`max-w-${maxWidth} mx-auto flex items-center justify-between py-4`}>
          <div 
            onClick={onResetToMain}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Talpyn
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {selectedLanguage === 'kz' ? 'Профиль' : 'Профиль'}
                </span>
              </Button>

              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[200px] border-gray-200 shadow-sm hover:border-gray-300 transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="primary" className="cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>
                        {selectedLanguage === 'ru'
                          ? 'Ученик 1-4 класса'
                          : selectedLanguage === 'kz'
                            ? '1-4 сынып оқушысы'
                            : 'Primary'}
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="secondary" className="cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>
                        {selectedLanguage === 'ru'
                          ? 'Ученик 5-11 класса'
                          : selectedLanguage === 'kz'
                            ? '5-11 сынып оқушысы'
                            : 'Secondary'}
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px] border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="ru" className="cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span>Русский</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="kz" className="cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span>Қазақша</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
