SWSpace/
│── backend/ # Xử lý server & API
│ │── src/
│ │ │── controllers/ # Xử lý logic (booking, user, payment)
│ │ │── models/ # Định nghĩa schema (User, Seat, Booking)
│ │ │── routes/ # Các API endpoint
│ │ │── services/ # Tích hợp payment, AI, email
│ │ │── utils/ # Hàm tiện ích, middleware
│ │ └── app.ts # Khởi tạo Express app
│ │── config/
│ │ │── supabaseClient.ts # Khởi tạo client Supabase
│ │ │── auth.ts # Middleware xác thực Supabase JWT
│ │ │── storage.ts # Config bucket upload (avatar, QR, booking data)
│ │ │── payment.ts # Tích hợp Momo/ZaloPay/VNPay
│ │ └── env.ts # Biến môi trường
│ │── tests/ # Unit & integration tests
│ │── package.json
│ └── server.ts # File chạy chính
│
│── frontend/ # Giao diện React/Next.js
│ │── public/ # Static files (favicon, logo)
│ │── src/
│ │ │── assets/ # Ảnh, icon
│ │ │── components/ # Component tái sử dụng (Navbar, SeatMap)
│ │ │── pages/ # Page chính (Home, Login, Dashboard)
│ │ │── hooks/ # Custom hooks (auth, fetch)
│ │ │── context/ # React Context API (AuthContext)
│ │ │── services/ # Gọi API backend
│ │ └── App.tsx # Entry React app
│ │── index.html
│ │── next.config.js
│ └── package.json
│
│── ai_module/ # Module AI YOLOv8
│ │── datasets/ # Dataset training
│ │── notebooks/ # Jupyter notebooks (training, testing)
│ │── models/ # Model đã train
│ │── scripts/ # Script chạy detection, integration
│ └── requirements.txt
│
│── database/ # Script DB
│ │── migrations/ # Tạo bảng
│ │── seeders/ # Dữ liệu mẫu
│ └── schema.sql # Cấu trúc DB
│
│── docs/ # Tài liệu đồ án
│ │── proposal.pdf # Đề cương (bản đã nộp)
│ │── final_report.docx # Báo cáo cuối kỳ
│ │── wireframes.md # Wireframe cho UI
│ │── user-flow.md # User Flow chi tiết
│ │── ui-design-kit.md # UI Kit (màu sắc, font, button, components)
│ │── technology-stack.md # Công nghệ & phiên bản sử dụng
│ │── technical-documentation.md# Tài liệu kỹ thuật (API, DB schema, kiến trúc)
│ │── coding-standards.md # Coding convention của nhóm
│ └── source-tree.md # Cấu trúc source tree này
│
│── .gitignore
│── README.md
│── package.json # Nếu quản lý chung workspace
└── docker-compose.yml # (Tùy chọn) Chạy backend + DB + AI bằng Docker

