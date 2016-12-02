##  OrangeCloud Enhancer Version 1
OrangeCloud Enhancer is an extension for Google Chrome that works on soundcloud.com webpages. It can:

- Visually minimize reposts in the Stream page
- Suggest tracks from any user's Likes or Tracks page or any Playlist page based on number of likes, plays, and other metrics
- Sort the user's own likes by date
- Back up the metadata of the user's own likes or a playlist in JSON format.

Navigate to a soundcloud.com webpage and click on the extension button to access these features.

At the moment, OrangeCloud Enhancer's algorithms heavily favour new tracks when making suggestions. This may be changed in later releases. Some tracks are not available for playback, sorting, or backup through OrangeCloud Enhancer. This seems to be due to limitations in SoundCloud's API (track uploaders can disallow third party apps from accessing resources via the API).

To try it out in Developer Mode:

1. Save the folder containing the extension files locally
2. Navigate to [chrome://extensions/](chrome://extensions/) in Google Chrome
3. Check the "Developer mode" box
4. Click "Load unpacked extension..."
5. Select the local folder where the extension files are saved and click "OK"
6. You're ready to go

If, for some reason, you want to port this extension to another browser, I'm totally cool with that. Get at me before you do, though, so I can change the license info and we can work out stuff about the API client ID.

Copyright (c) 2016 Daniel Adams  
orangeclouddev@outlook.com  
@InternetDenizen on SoundCloud  
