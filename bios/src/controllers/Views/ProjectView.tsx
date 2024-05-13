import { UIController, UIView, VStack, HStack, Text, useState, useEffect } from '@tuval/forms';
import { Services } from '@realmocean/sdk'; // SDK'yı dahil ediyoruz

export class ProjectView extends UIController {
    public override LoadView(): UIView {
        const [projects, setProjects] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            console.log("Projeler listeleniyor...");
            Services.Projects.list().then((response) => {
                console.log('Gelen projeler:', response.projects); // Projeleri konsola logla
                setProjects(response.projects); // Projeleri state'e kaydet
                setLoading(false); // Yükleme durumunu güncelle
            }).catch((error) => {
                console.error('Projeler yüklenemedi:', error);
                setLoading(false); // Yükleme durumunu güncelle
                console.error("Hata detayı:", error.message); // Hata mesajını detaylı logla
            });
        }, []);

        const renderHeader = () => {
            return HStack().children(
                Text("Proje Adı").fontSize(16).fontWeight('bold').padding(5),
                Text("Açıklama").fontSize(16).fontWeight('bold').padding(5),
                Text("Database ID").fontSize(16).fontWeight('bold').padding(5),
                Text("Organization ID").fontSize(16).fontWeight('bold').padding(5)
            );
        };

        const renderProject = (project) => {
            return HStack().children(
                Text(`ID: ${project.id}`).fontSize(18).fontWeight('bold'),
                Text(`İsim: ${project.name}`).fontSize(16),
                Text(`Açıklama: ${project.description}`).fontSize(14),
                Text(`Database ID: ${project.databaseId}`).fontSize(12),
                Text(`Organization ID: ${project.organizationId}`).fontSize(12)
            ).padding(10)
        };

        return VStack().children(
            Text("Projeler").fontSize(24).fontWeight('bold'),
            loading ? Text("Yükleniyor...") :
            VStack().children(
                renderHeader(),
                ...projects.map(project => renderProject(project))
            )
        );
    }
}
