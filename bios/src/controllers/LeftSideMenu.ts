import { UIController, UIView, VStack, Button, useNavigate, Text, ScrollView, Icon, Spacer, cLeading } from '@tuval/forms';

export class LeftSideMenu extends UIController {
    public LoadView(): UIView {
        const navigate = useNavigate();

        // Menü öğelerini tanımla
        const menuItems = [
            { title: 'Ana Sayfa', path: '/app/home', icon: 'home' },
            { title: 'Projeler', path: '/app/projects', icon: 'projects' },
            { title: 'Ayarlar', path: '/app/settings', icon: 'settings' },
            { title: 'Çıkış Yap', path: '/logout', icon: 'logout' }
        ];

        // ScrollView içinde VStack kullanımı
        const menuView = ScrollView(
            VStack({ alignment: cLeading, spacing: 10 })(
                ...menuItems.map(item =>
                    Button(
                        VStack({ alignment: cLeading, spacing: 10 })(
                            Icon(item.icon).size(24),
                            Text(item.title).fontSize(16).foregroundColor('#ffffff')
                        ))
                    .onClick(() => navigate(item.path))
                    .height(50)
                    .padding('10px 20px')
                    .background('#333645') 
                    .cornerRadius(5)
                ),
                Spacer()
            ))
            .padding(20)
            .background('#333645') 
            .width(250)
        return menuView;
    }
}
