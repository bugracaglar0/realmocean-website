import { VStack, Text, UIButton, UINavigate, UIView, UIController } from "@tuval/forms";
import { useListRealms } from "@realmocean/sdk";

export class HomeController extends UIController {
    public override LoadView(): UIView {
        const { realms, isLoading } = useListRealms();

        const menuItems = [
            { title: 'Hakkımızda', path: '/about' },
            { title: 'Giriş Yap', path: '/login' },
            { title: 'İletişim', path: '/contact' }
        ];

        // Menü elemanlarını oluştur
        const menuButtons = menuItems.map(item =>
            UIButton()
                .children(Text(item.title))
                .onClick(() => UINavigate(item.path))
                .backgroundColor('#eeeeee')
                .cornerRadius('5px')
                .padding('10px')
        );
        // İçerik alanı
        const renderContent = () => {
            if (isLoading) {
                return Text('Yükleniyor...').padding('20px');
            }
            if (realms.length === 0) {
                return UINavigate('/setup');
            }
            return Text('Ana Sayfa').padding('20px');
        };

        // Footer tasarımı
        const footerStyle = {
            padding: '10px',
            fontSize: "12px",
            textAlign: 'center'
        };

        return (
            VStack()
                .children(Text("Hoş Geldiniz!").fontSize('24px').fontWeight('bold').padding('20px').backgroundColor('#4a90e2').height('60px').textAlign('center'))
                .children(...menuButtons)
                .children(renderContent())
                .children(Text('© 2024 Company Name').padding('10px').fontSize('12px').textAlign('bottom'))
                .background('#f0f4f8')
                .padding('20px')
        );
    }
}
