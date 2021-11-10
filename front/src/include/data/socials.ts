import { SvgIconComponent } from '@material-ui/icons';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PublicIcon from '@material-ui/icons/Public';

export interface TypeOfSocial {
    id: number;
    name: string;
    translate: string;
    icon: SvgIconComponent;
}

export const socials: TypeOfSocial[] = [
    { id: 1, name: 'twitter', translate: 'توییتر', icon: TwitterIcon },
    { id: 2, name: 'instagram', translate: 'اینستاگرام', icon: InstagramIcon },
    { id: 3, name: 'facebook', translate: 'فیسبوک', icon: FacebookIcon },
    { id: 4, name: 'telegram', translate: 'تلگرام', icon: TelegramIcon },
    { id: 5, name: 'linkedin', translate: 'لینکدین', icon: LinkedInIcon },
    { id: 6, name: 'website', translate: 'وبسایت', icon: PublicIcon }
];
