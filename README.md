# Attribution Builder

The Attribution Builder helps users easily cite open material by automatically generating attributions for Creative Commons or public domain works.

## Purpose

- Provide a tool to generate attributions for openly distributed works.
- Support Creative Commons licenses and public domain works.
- Allow users to customize attributions to suit their needs.

## Features

- Generate attributions for titles, authors, organizations, and projects.
- Support for Creative Commons licenses and public domain (CC0).
- Option to include derivative work details.
- Light, dark, and system theme options.
- Copy attribution text or HTML to the clipboard.

## System Requirements

- **Web Server**: Any web server capable of serving static files (e.g., Apache, Nginx, or GitHub Pages).
- **Browser Compatibility**: Modern browsers supporting HTML5, CSS3, and JavaScript.
- **Other Dependencies**: Bootstrap 5.3.2 (via CDN), Creative Commons assets (via CDN).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RMITLibrary/attribution-builder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd attribution-builder
   ```

## Configuration

- **CMS/Static Site Setup**: Ensure the site is hosted on a server supporting HTTPS for clipboard functionality.

## Environments

- **Development**: `http://localhost:3000`
- **Production**: `https://www.lib.rmit.edu.au/attrib/attribution-builder`

## Testing and Deployment

- **Deployment**: Gitflow release, then deploy the version tag on the server.

1. Release from a clean `develop` (`patch` by default, or `minor` / `major`):
   ```bash
   scripts/release.sh
   ```
   This bumps the latest `X.Y.Z` tag, merges `release/<version>` into `main`, tags it, merges the tag back into `develop` and pushes all three.
2. On the server, run `attribution-builder-deploy <version>`. It downloads the tag from GitHub, backs up the live files, deploys and checks the site responds. Server details and the helper are kept outside this public repo.
3. To roll back, run the rollback command printed by the deploy.

## Authors and Acknowledgments

- Developed by RMIT Library Digital Learning.
- Special thanks to the Open Attribution Builder by WA SBCTC for inspiration.

## License

Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

#### © RMIT University Library

###### Developed by RMIT Library Digital Learning

## Contact

- Repo Admin: Jack Dunstan ([jack.dunstan@rmit.edu.au](mailto:jack.dunstan@rmit.edu.au))
- Additional Contact: [digital.learning.library@rmit.edu.au](mailto:digital.learning.library@rmit.edu.au)

## Resources

- [Active RMIT Library GitHub](https://github.com/RMITLibrary)
- [Archived RMIT Library GitHub](https://github.com/RMITLibrary-Archived)
- [Creative Commons License Chooser](https://creativecommons.org/choose)
- [CC0 Waiver](https://creativecommons.org/choose/zero/waiver)