import { AppConfigService } from './appconfig.service';
export function initializeConfig(appConfigService: AppConfigService) {
    return () => {
        return appConfigService.loadConfig();
    };
}
