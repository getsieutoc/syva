import {
  Avatar,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

type InterviewerType = {
  name: string;
  age: string;
  avatar: string;
  jobTitle: string;
  jobDescription: string;
  dateAplly: string;
};
const dataTemp: InterviewerType[] = [
  {
    name: 'Michel Ann',
    avatar: 'https://github.com/shadcn.png',
    age: '25',

    dateAplly: '19:30 20-01-2024',
    jobDescription: 'Backend develop | Javascript | PHP',
    jobTitle: `Solution architect: 1+ years of enterprise AWS experiences related to pre-sales, technical consulting in B2B environments
    1+ years Hands-on experience in developing and operating AWS cloud infra
    Ability to understand and present complex technical topics to both technical and business leaders
    Able to switch working time 8:30 ~ 17:30 or 13:00~21:00 in case
    Strong foundational knowledge in one or more of the following domains; CI/CD, K8S, Database, AWS Management 
    Ability to work effectively across internal and external organizations
    BS degree in Computer Science or relevant experiences`,
  },
  {
    name: 'Adam Chin',
    avatar: 'https://i.pravatar.cc/150?img=68',
    age: '30',
    dateAplly: '09:10 10-03-2024',
    jobDescription: 'Fontend develop | ReactJS | React Native | AngularJS',
    jobTitle: `Software engineer: B.S in Mechatronic Engineering, Automotive Engineering, Computing Engineering, Information Technology or related major
    5+ of experience in Embedded Software Development ...`,
  },
  {
    name: 'Linda',
    avatar: 'https://i.pravatar.cc/150?img=29',
    age: '32',
    dateAplly: '14:30 20-01-2024',
    jobDescription: 'Fullstack develop | NodeJS | Go | BunJS | .NET',
    jobTitle: `At least 4 years' experience as a Full Stack/Backend Developer.`,
  },
  {
    name: 'Carrot',
    avatar: 'https://i.pravatar.cc/150?img=33',
    age: '39',
    dateAplly: '13:30 10-03-2024',
    jobDescription: 'React Native, Flutter',
    jobTitle: 'Mobile App Developer (Flutter)',
  },
];

export const InterviewerList = () => {
  return (
    <div>
      <h1 className="font-mono text-6xl font-bold text-orange-400 drop-shadow-lg">
        Interviewers
      </h1>
      {dataTemp.map((item, idx) => (
        <div key={idx} className="py-3">
          <InterviewItem item={item} />
        </div>
      ))}
    </div>
  );
};

type InterviewItemTypes = {
  item: InterviewerType;
};
const InterviewItem = (props: InterviewItemTypes) => {
  const { item } = props;

  return (
    <Card className="cursor-pointer hover:bg-gray-100">
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <Avatar size="md">
              <AvatarImage alt={item.name} src={item.avatar} />
            </Avatar>
            <div className="p-3">
              {item.name}
              <CardDescription>{item.age} year old</CardDescription>
              <CardDescription>{item.jobDescription}</CardDescription>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{item.jobTitle}</CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Apply at {item.dateAplly}
        </div>
      </CardFooter>
    </Card>
  );
};
