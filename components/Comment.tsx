import { useState } from 'react';

export default function Component() {
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the comment submission logic here
    console.log(comment);
  };

  return (
    <div className="space-y-8 w-full px-4 sm:px-6 md:max-w-2xl md:mx-auto">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Comments</h2>
        <p className="text-gray-500">Share your thoughts and feedback with the community.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 border rounded-full overflow-hidden">
              <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
            </div>
            <textarea
              placeholder="Write your comment..."
              className="resize-none flex-1 border rounded-md p-2"
              rows={3}
              value={comment}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button type="button" className="flex items-center gap-3 border rounded-md px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-100">
                <ChromeIcon className="h-5 w-5 text-gray-500" />
                Sign in with Google
              </button>
              <span className="text-gray-500">or</span>
              <button type="button" className="flex items-center gap-3 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
                <MailIcon className="h-5 w-5" />
                Sign in with Email
              </button>
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
      <div className="space-y-4">
        <Comment
          name="Olivia Davis"
          date="2 days ago"
          text="This is a great product! I've been using it for a few weeks now and it's been a game-changer for my business."
        />
        <Comment
          name="John Doe"
          date="1 week ago"
          text="I'm really impressed with the attention to detail and the responsiveness of the team. Keep up the great work!"
        />
        <Comment
          name="Sarah Anderson"
          date="3 days ago"
          text="I'm really excited to see what the future holds for this product. Keep up the great work!"
        />
      </div>
    </div>
  );
}

function Comment({ name, date, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 border rounded-full overflow-hidden">
        <img src="/placeholder-user.jpg" alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="grid gap-1 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500">{date}</div>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}


// NEXT_PUBLIC_FIREBASE_API_KEY=
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
// NEXT_PUBLIC_FIREBASE_APP_ID=

// FIREBASE_SERVICE_ACCOUNT_KEY='{
//   "type": "",
//   "project_id": "",
//   "private_key_id": "",
//   "private_key": "",
//   "client_email": "",
//   "client_id": "",
//   "auth_uri": "",
//   "token_uri": "",
//   "auth_provider_x509_cert_url": "",
//   "client_x509_cert_url": "",
//   "universe_domain": ""
// }
// '
