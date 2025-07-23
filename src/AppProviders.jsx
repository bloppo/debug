import {Theme} from "@radix-ui/themes";
import {GlobalProvider} from "./Provider/GlobalProvider.jsx";
import {LilGuiProvider} from "./Provider/LilGuiProvider.jsx";

const AppProviders = ({children}) => {

return (
<Theme>
    <GlobalProvider>
        <LilGuiProvider>
            {children}
        </LilGuiProvider>
    </GlobalProvider>
</Theme>
);

}

export default AppProviders;
