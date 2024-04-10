import * as fs from 'fs';
import CircularJSON from 'circular-json';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const bodyWithoutCircularRefs = CircularJSON.stringify(req.body);
   
    let data =await fs.promises.readdir('contactdata');
    fs.writeFile(`contactdata/${data.length+1}.json`, bodyWithoutCircularRefs, () => {});
    res.status(200).json(req.body);
  } else {
    // Handle any other HTTP method
    res.status(200).json(['allBlogs']);
    // name,email,desc,phone 
  }
}
