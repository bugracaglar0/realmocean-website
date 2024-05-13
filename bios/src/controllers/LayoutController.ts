import { UIController, UIView, VStack, HStack, Button, useNavigate, Text, ScrollView, Icon, Spacer, cLeading } from '@tuval/forms';

export class LayoutController extends UIController {
    public LoadView(): UIView {
        const navigate = useNavigate();

        
        const menuItems = [
            { title: 'Ana Sayfa', path: '/app/home', icon: 'home' },
            { title: 'Projeler', path: '/app/projects', icon: 'projects' },
            { title: 'Ayarlar', path: '/app/settings', icon: 'settings' },
            { title: 'Çıkış Yap', path: '/logout', icon: 'logout' }
        ];

        const menuView = ScrollView(
            VStack({ alignment: cLeading, spacing: 10 })(
                ...menuItems.map(item =>
                    Button(
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon(item.icon).size(24),
                            Text(item.title).fontSize(16).foregroundColor('#ffffff')
                        ))
                    .onClick(() => navigate(item.path))
                    .height(50)
                    .padding('10px 20px')
                    .background('#A05A95')  
                    .cornerRadius(5)
                ),
                Spacer()
            ))
            .padding(20)
            .background('#A05A95')  
            .width(250)
        return menuView;
    }
}
