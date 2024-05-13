import {
  UIController,
  UIView,
  VStack,
  Text,
  Input,
  Button,
  useNavigate,
  TextField,
  useState,
} from '@tuval/forms'
import { createProjectNewVersion as createProjectFromDB } from './Database'
import { Services } from '@realmocean/sdk'



export async function createProjectNewVersion() {
    try {
        const projects = await Services.Projects.list(); // Bu varsayımı, kendi API'nize uygun şekilde ayarlayın
        console.log('Çekilen projeler:', projects); // Çıktıyı kontrol edin
        return (project => ({
          id: project.$id,
          name: project.name,
          description: project.description,
          databaseId: 'dummyDBId', // Bu kısımlar varsayılan veya test değerleri olabilir
          organizationId: 'dummyOrgId'
        }));
      } catch (error) {
        console.error('Projeleri çekme hatası:', error);
        throw error;
      }
    }


export class CreateProjectController extends UIController {
  public override LoadView(): UIView {
    const navigate = useNavigate()
    const [projectname, setprojectname] = useState<string>('')
    const [projectdescription, setprojectdescription] = useState<string>('')
    const [organisationname, setorganisationname] = useState<string>('')
    const [databasename, setdatabasename] = useState<string>('')
    const [resultstring, setresultstring] = useState<string>('')

    const createProject = async () => {
      try {
        const project = await createProjectFromDB(
          projectname,
          projectdescription,
          organisationname,
          databasename
        )
        setresultstring(
          `Yeni oluşturulan organizasyonun idsi: ${project.organization?.$id}, yeni oluşturulan projenin idsi: ${project.realm?.$id}, yeni oluşturulan databasein idsi ve adı(aynı değer girildi): ${project.database?.$id}`
        )
        navigate('/app/projectview')
      } catch (error) {
        console.error('Proje oluşturulamadı:', error)
      }
    }

    const checkProject = async () => {
      //   try {
      //     const project = await Services.Projects.get(projectid)
      //     console.log('project', project)
      //   } catch (error) {
      //     console.log(error)
      //   }
    }

    function TuTextField(
      placeholder: string,
      onChange: (value: string) => void
    ) {
      return Input().placeholder(placeholder).onChange(onChange)
    }

    return VStack().children(
      Text('Yeni Proje Oluşturma Sayfası').fontSize(24).fontWeight('bold'),
      TextField()
        .placeholder('Proje Adı Giriniz')
        .value(projectname)
        .onChange((value) => setprojectname(value))
        .fontSize(12),
      TextField()
        .placeholder('Proje Açıklaması Giriniz')
        .value(projectdescription)
        .onChange((value) => setprojectdescription(value))
        .fontSize(12),
      TextField()
        .placeholder('Organizasyon adı giriniz')
        .value(organisationname)
        .onChange((value) => setorganisationname(value))
        .fontSize(12),
      TextField()
        .placeholder('Database adı giriniz')
        .value(databasename)
        .onChange((value) => setdatabasename(value))
        .fontSize(12),
      Text(resultstring).fontSize(30),
      Button(Text('Proje Oluştur')).onClick(() => createProject()),
      Button(Text('Projeyi Çek')).onClick(() => checkProject())
    )
  }
}
