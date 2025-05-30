
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

// Mock exam results
const mockExamResults = [
  {
    subject: "Математика",
    subjectKz: "Математика",
    score: 95,
    maxScore: 100,
    date: "2024-05-15",
    grade: "A",
    percentile: 98
  },
  {
    subject: "Физика",
    subjectKz: "Физика",
    score: 88,
    maxScore: 100,
    date: "2024-05-10",
    grade: "A",
    percentile: 92
  },
  {
    subject: "Химия",
    subjectKz: "Химия",
    score: 82,
    maxScore: 100,
    date: "2024-05-08",
    grade: "B+",
    percentile: 85
  },
  {
    subject: "Биология",
    subjectKz: "Биология",
    score: 91,
    maxScore: 100,
    date: "2024-05-12",
    grade: "A",
    percentile: 94
  },
  {
    subject: "История Казахстана",
    subjectKz: "Қазақстан тарихы",
    score: 76,
    maxScore: 100,
    date: "2024-05-05",
    grade: "B",
    percentile: 78
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'kz'>('ru');
  const [selectedType, setSelectedType] = useState<'primary' | 'secondary'>('secondary');

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B+': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-yellow-100 text-yellow-800';
      case 'C': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const averageScore = Math.round(mockExamResults.reduce((acc, exam) => acc + exam.score, 0) / mockExamResults.length);

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
                {selectedLanguage === 'kz' ? 'Емтихан нәтижелері' : 'Результаты экзаменов'}
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
                      <GraduationCap className="w-5 h-5 text-green-600" />
                      {selectedLanguage === 'kz' ? 'Қызығушылықтар' : 'Интересы'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(selectedLanguage === 'kz' ? mockProfile.interestsKz : mockProfile.interests).map((interest, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>{selectedLanguage === 'kz' ? 'Емтихан нәтижелері' : 'Результаты экзаменов'}</CardTitle>
                  <CardDescription>
                    {selectedLanguage === 'kz' 
                      ? 'Соңғы емтихандардың нәтижелері мен бағалары' 
                      : 'Последние результаты экзаменов и оценки'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{selectedLanguage === 'kz' ? 'Пән' : 'Предмет'}</TableHead>
                        <TableHead>{selectedLanguage === 'kz' ? 'Балл' : 'Балл'}</TableHead>
                        <TableHead>{selectedLanguage === 'kz' ? 'Баға' : 'Оценка'}</TableHead>
                        <TableHead>{selectedLanguage === 'kz' ? 'Процентиль' : 'Процентиль'}</TableHead>
                        <TableHead>{selectedLanguage === 'kz' ? 'Күні' : 'Дата'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockExamResults.map((exam, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {selectedLanguage === 'kz' ? exam.subjectKz : exam.subject}
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold">{exam.score}</span>
                            <span className="text-gray-500">/{exam.maxScore}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getGradeColor(exam.grade)}>
                              {exam.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>{exam.percentile}%</TableCell>
                          <TableCell className="text-gray-500">{exam.date}</TableCell>
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
                      {selectedLanguage === 'kz' ? 'Үздік оқушы' : 'Лучший ученик'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-yellow-700">
                      {selectedLanguage === 'kz' 
                        ? '2024 жылдың 1-ші тоқсанында математика пәнінен' 
                        : 'По математике в 1-й четверти 2024 года'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg text-blue-800">
                      {selectedLanguage === 'kz' ? 'Олимпиада жеңімпазы' : 'Победитель олимпиады'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-blue-700">
                      {selectedLanguage === 'kz' 
                        ? 'Информатика пәнінен қалалық олимпиада, 2-орын' 
                        : 'Городская олимпиада по информатике, 2-е место'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg text-green-800">
                      {selectedLanguage === 'kz' ? 'Жоба жұмысы' : 'Проектная работа'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-green-700">
                      {selectedLanguage === 'kz' 
                        ? 'Ғылыми жоба байқауында 1-орын' 
                        : 'Победитель конкурса научных проектов'}
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
