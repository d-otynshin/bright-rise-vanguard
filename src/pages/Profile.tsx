
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/shared/Header";
import { useNavigate } from "react-router-dom";
import { User, GraduationCap, Award, Calendar } from "lucide-react";

// Mock data for user profile
const mockProfile = {
  name: "Айгерим Нұрланқызы",
  nameEn: "Aigerim Nurlankzy",
  email: "aigerim.nurlan@example.com",
  grade: "10 класс",
  gradeKz: "10 сынып",
  school: "Назарбаев Интеллектуальная школа Астана",
  schoolKz: "Назарбаев Зияткерлік мектебі Астана",
  birthDate: "15.03.2007",
  interests: ["Математика", "Информатика", "Биология"],
  interestsKz: ["Математика", "Информатика", "Биология"],
  avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
};

// Mock RAISEC test results
const mockRAISECResults = [
  {
    category: "Realistic",
    categoryRu: "Реалистичный",
    categoryKz: "Реалистік",
    description: "Работа с инструментами, машинами",
    descriptionKz: "Құралдармен, машиналармен жұмыс",
    score: 28,
    maxScore: 50,
    percentile: 75,
    color: "bg-blue-100 text-blue-800"
  },
  {
    category: "Investigative", 
    categoryRu: "Исследовательский",
    categoryKz: "Зерттеушілік",
    description: "Анализ, исследования, решение проблем",
    descriptionKz: "Талдау, зерттеу, мәселелерді шешу",
    score: 42,
    maxScore: 50,
    percentile: 92,
    color: "bg-green-100 text-green-800"
  },
  {
    category: "Artistic",
    categoryRu: "Артистический", 
    categoryKz: "Көркемдік",
    description: "Творчество, самовыражение",
    descriptionKz: "Шығармашылық, өзін-өзі көрсету",
    score: 35,
    maxScore: 50,
    percentile: 80,
    color: "bg-purple-100 text-purple-800"
  },
  {
    category: "Social",
    categoryRu: "Социальный",
    categoryKz: "Әлеуметтік", 
    description: "Помощь и обучение других",
    descriptionKz: "Басқаларға көмек көрсету және оқыту",
    score: 38,
    maxScore: 50,
    percentile: 85,
    color: "bg-orange-100 text-orange-800"
  },
  {
    category: "Enterprising",
    categoryRu: "Предприимчивый",
    categoryKz: "Кәсіпкерлік",
    description: "Лидерство, управление, продажи",
    descriptionKz: "Көшбасшылық, басқару, сату",
    score: 31,
    maxScore: 50,
    percentile: 72,
    color: "bg-red-100 text-red-800"
  },
  {
    category: "Conventional",
    categoryRu: "Конвенциональный",
    categoryKz: "Дәстүрлі",
    description: "Организация данных, детальная работа",
    descriptionKz: "Деректерді ұйымдастыру, егжей-тегжейлі жұмыс",
    score: 25,
    maxScore: 50,
    percentile: 68,
    color: "bg-yellow-100 text-yellow-800"
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'kz'>('ru');
  const [selectedType, setSelectedType] = useState<'primary' | 'secondary'>('secondary');

  const averageScore = Math.round(mockRAISECResults.reduce((acc, result) => acc + result.score, 0) / mockRAISECResults.length);
  const topCategory = mockRAISECResults.reduce((max, current) => current.score > max.score ? current : max);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        selectedLanguage={selectedLanguage}
        selectedType={selectedType}
        onLanguageChange={setSelectedLanguage}
        onTypeChange={setSelectedType}
        onResetToMain={() => navigate("/")}
        maxWidth="6xl"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                  <img 
                    src={mockProfile.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedLanguage === 'kz' ? mockProfile.name : mockProfile.nameEn}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 mb-4">
                    {selectedLanguage === 'kz' ? mockProfile.gradeKz : mockProfile.grade} • {selectedLanguage === 'kz' ? mockProfile.schoolKz : mockProfile.school}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedLanguage === 'kz' ? 'Туған күні' : 'Дата рождения'}: {mockProfile.birthDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{mockProfile.email}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{averageScore}</div>
                  <div className="text-sm text-gray-500">{selectedLanguage === 'kz' ? 'Орташа балл' : 'Средний балл'}</div>
                  <div className="text-xs text-gray-400 mt-1">RAISEC</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-sm">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {selectedLanguage === 'kz' ? 'Жалпы ақпарат' : 'Обзор'}
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {selectedLanguage === 'kz' ? 'RAISEC нәтижелері' : 'Результаты RAISEC'}
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                {selectedLanguage === 'kz' ? 'Жетістіктер' : 'Достижения'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      {selectedLanguage === 'kz' ? 'Жеке ақпарат' : 'Личная информация'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {selectedLanguage === 'kz' ? 'Толық аты' : 'Полное имя'}:
                      </span>
                      <p className="text-gray-900">{mockProfile.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {selectedLanguage === 'kz' ? 'Сынып' : 'Класс'}:
                      </span>
                      <p className="text-gray-900">{selectedLanguage === 'kz' ? mockProfile.gradeKz : mockProfile.grade}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {selectedLanguage === 'kz' ? 'Мектеп' : 'Школа'}:
                      </span>
                      <p className="text-gray-900">{selectedLanguage === 'kz' ? mockProfile.schoolKz : mockProfile.school}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      {selectedLanguage === 'kz' ? 'Жоғары нәтиже' : 'Лучший результат'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {selectedLanguage === 'kz' ? topCategory.categoryKz : topCategory.categoryRu}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {selectedLanguage === 'kz' ? topCategory.descriptionKz : topCategory.description}
                      </div>
                      <Badge className={topCategory.color}>
                        {topCategory.score}/{topCategory.maxScore} {selectedLanguage === 'kz' ? 'балл' : 'баллов'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{selectedLanguage === 'kz' ? 'RAISEC тест нәтижелері' : 'Результаты RAISEC теста'}</CardTitle>
                  <CardDescription>
                    {selectedLanguage === 'kz' 
                      ? 'Мамандық бағдарын анықтау тестінің нәтижелері' 
                      : 'Результаты теста на определение профессиональной направленности'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{selectedLanguage === 'kz' ? 'Санат' : 'Категория'}</TableHead>
                        <TableHead>{selectedLanguage === 'kz' ? 'Сипаттама' : 'Описание'}</TableHead>
                        <TableHead>{selectedLanguage === 'kz' ? 'Балл' : 'Балл'}</TableHead>
                        <TableHead>{selectedLanguage === 'kz' ? 'Процентиль' : 'Процентиль'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRAISECResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Badge className={result.color}>
                                {result.category.charAt(0)}
                              </Badge>
                              <span>{selectedLanguage === 'kz' ? result.categoryKz : result.categoryRu}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {selectedLanguage === 'kz' ? result.descriptionKz : result.description}
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold">{result.score}</span>
                            <span className="text-gray-500">/{result.maxScore}</span>
                          </TableCell>
                          <TableCell>{result.percentile}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <CardTitle className="text-lg text-yellow-800">
                      {selectedLanguage === 'kz' ? 'RAISEC сарапшысы' : 'RAISEC эксперт'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-yellow-700">
                      {selectedLanguage === 'kz' 
                        ? 'Кәсіби бағдар тестін сәтті аяқтады' 
                        : 'Успешно завершил тест профориентации'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg text-blue-800">
                      {selectedLanguage === 'kz' ? 'Зерттеуші' : 'Исследователь'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-blue-700">
                      {selectedLanguage === 'kz' 
                        ? 'Зерттеушілік санатта жоғары нәтиже' 
                        : 'Высокий результат в категории Исследовательский'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg text-green-800">
                      {selectedLanguage === 'kz' ? 'Мамандық табушы' : 'Искатель профессии'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-green-700">
                      {selectedLanguage === 'kz' 
                        ? 'Өзіне сай мамандықты табуға дайын' 
                        : 'Готов найти подходящую профессию'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
