
import { UIController, UIView, VStack, Text, useNavigate, useEffect,} from '@tuval/forms';
import { useGetMe } from '@realmocean/sdk' ; 

export class LoginSuccess extends UIController {
    public override LoadView(): UIView {
        const navigate = useNavigate();

        const { me, isLoading, isError: isAccountError } = useGetMe('console');
        

        
        useEffect(() => {
            navigate('/app/layout');
        }, []); 

        return (
            VStack().children(
                Text("Giriş Başarılı! Hoş geldiniz.")
            )
        );
    }
}
