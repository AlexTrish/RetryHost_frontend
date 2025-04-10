import { t } from "i18next";

export const translations = {
  en: {
    translation: {
      auth: {
        loginTitle: 'Welcome Back',
        registerTitle: 'Create Account',
        loginSubtitle: 'Sign in to your account',
        registerSubtitle: 'Join our community today',
        username: 'Username',
        usernamePlaceholder: 'Enter your username',
        usernameRequired: 'Username is required',
        email: 'Email',
        emailPlaceholder: 'Enter your email',
        emailRequired: 'Email is required',
        referralCode: 'Referral Code (optional)',
        referralCodePlaceholder: 'Enter your referral code',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        passwordRequired: 'Password is required',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Confirm your password',
        loginButton: 'Sign In',
        registerButton: 'Create Account',
        loading: 'Processing...',
        error: 'Authentication failed',
        passwordMismatch: 'Passwords do not match',
        noAccount: "Don't have an account? Register",
        hasAccount: 'Already have an account? Sign in',
        forgotPassword: 'Forgot Password?',
        logout: 'Log out',
        or: 'or',
        account: 'My Account'
      },
      account: {
        dashboard: {
          dash: 'Dashboard',
          yourRefferal: 'Your referral code: ',
          yourRefferalLink: 'Your referral link: ',
          totalRefferals: 'Total referrals: ',
          activeRefferals: 'Active referrals: ',
          totalEarnings: 'Total earnings: ',
          recentReferrals: 'Recent referrals: ',
          recentNotFound: 'No recent referrals yet.',
        },
        service: 'Services',
        billing: 'Transactions',
        settings: 'Settings',
        security: 'Security',
        balance: 'Balance',
        addFunds: 'Add Funds',
        activeServices: 'Active Services',
        nextPayment: 'Next Payment',
        dueIn: 'Due in',
        days: 'days',
        recentActivity: 'Recent Activity',
        cryptoPayment: {
          title: 'Cryptomus Payment',
          description: 'Pay with your preferred cryptocurrency',
          amount: 'Amount to Add (USD)',
          amountPlaceholder: 'Enter amount',
          button: 'Add Funds with Cryptomus'
        },
        transactions: {
          title: 'Transaction History',
          date: 'Date',
          method: 'Payment Method',
          amount: 'Amount',
          status: 'Status'
        },
        services: {
          yourServices: 'Your Services',
          addNew: 'Add New Service',
          manage: 'Manage',
          renew: 'Renew',
          expires: 'Expires',
          status: {
            active: 'Active',
            suspended: 'Suspended',
            expired: 'Expired'
          }
        },
        common: {
          comingSoon: 'Coming Soon',
          loading: 'Loading...',
        }
      },
      menu: {
        home: 'Home',
        services: {
          services: 'Services',
          virtual: 'Virtual Hosting',
          domain: 'Domain Registration'
        },
        referral: 'Referral Program',
        about: {
          about: 'About Us',
          company: 'Company Info',
          terms: 'Terms of Service',
          privacy: 'Privacy Policy',
          contact: 'Contact Us'
        }
      },
      hero: {
        title: 'Fast, Secure & Reliable Hosting',
        subtitle: 'Get Started Today!',
        description: 'Experience enterprise-grade hosting solutions with unmatched performance, security, and 24/7 support.',
        getStarted: 'Get Started',
        viewPlans: 'View Plans'
      },
      features: {
        virtualHosting: {
          title: 'Fast Virtual Hosting',
          description: 'Lightning-fast servers with SSD storage and optimized performance'
        },
        vps: {
          title: 'Secure VPS/VDS Rental',
          description: 'Dedicated resources with full root access and guaranteed RAM'
        },
        security: {
          title: 'Abuse-Resistant Servers',
          description: 'Enhanced security measures with DDoS protection included'
        },
        domains: {
          title: 'Easy Domain Registration',
          description: 'Register and manage domains with one-click installation'
        }
      },
      pricing: {
        title: 'Choose Your Perfect Plan',
        mostPopular: 'Most Popular',
        perMonth: '/month',
        getStart: 'Get Started',
        plans: {
          starter: 'Starter',
          professional: 'Professional',
          enterprise: 'Premium'
        }
      },
      testimonials: {
        title: 'What Our Clients Say'
      },
      footer: {
        company: {
          company: 'Company',
          about: 'About Us',
          contact: 'Contacts',
        },
        services: {
          services: 'Services',
          hosting: 'Virtual Hosting',
          domain: 'Domain'
        },
        support: {
          support: 'Support',
          help: 'Help Center',
        },
        legal: {
          legal: 'Legal',
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
          security: 'Security'
        }
      },
      theme: {
        light: 'Light',
        dark: 'Dark'
      },
      companypage: {
        about: 'About Our Company',
        slogan: 'Your trusted partner in web hosting and cloud solutions',
        company: {
          about: 'We Are RetryHost',
          info1: 'A company providing services: shared hosting, VDS/VPS rental, abyssal servers and dedicated servers, domain registration and additional hosting services. RETRY.HOST began its journey in 2021 and now provides a full range of hosting services, we have already gained hundreds of satisfied customers.s',
          info2: 'Our prices are really affordable so that everyone can benefit from our services! Our technicians work around the clock! Support is also available in Russian.',
          card1: 'Active Customers',
          card2: 'Registered Domains',
          card3: 'Support',
          card4: 'Data Centers'
        },
        cards: {
          customer: {
            headline: 'Customer First',
            info: 'We prioritize our customers needs above all else'
          },
          innovation: {
            headline: 'Innovation',
            info: 'Constantly improving our services and technology'
          },
          reliability: {
            headline: 'Reliability',
            info: 'Committed to providing stable and secure services'
          },
          quality: {
            headline: 'Quality',
            info: 'Never compromising on the quality of our service'
          },
        },
        news: 'Latest News'
      },
      domainpage: {
        registration: {
          title: 'Domain Registration',
          subtitle: 'Find and register your perfect domain name',
          searchPlaceholder: 'Enter your domain name',
          searchButton: 'Search',
        },
        features: {
          wideSelection: {
            title: 'Wide Selection',
            description: 'Choose from hundreds of domain extensions',
          },
          domainPrivacy: {
            title: 'Domain Privacy',
            description: 'Protect your personal information',
          },
          easyTransfer: {
            title: 'Easy Transfer',
            description: 'Simple domain transfer process',
          },
        },
        popularExtensions: {
          title: 'Popular Domain Extensions',
        },
        helpSection: {
          title: 'Need Help?',
          description: 'Our domain experts are here to help you choose and configure your domain',
          contactSupport: 'Contact Support',
        },
        pricePerYear: 'year',
      },
      privacyPage: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: March 15, 2025",
        sections: {
          informationCollection: {
            title: "1. Information Collection",
            description: "We collect information that you provide directly to us, including:",
            items: [
              "Account information (name, email, billing details)",
              "Service usage data",
              "Communication preferences",
              "Technical information about your devices"
            ]
          },
          dataProtection: {
            title: "2. Data Protection",
            description: "We implement various security measures to maintain the safety of your personal information:",
            items: [
              "Encryption of sensitive data",
              "Regular security audits",
              "Access controls and authentication",
              "Physical security measures"
            ]
          },
          informationUsage: {
            title: "3. Information Usage",
            description: "We use the collected information to:",
            items: [
              "Provide and maintain our services",
              "Process your transactions",
              "Send you technical notices and support messages",
              "Communicate about promotions and updates"
            ]
          },
          dataRetention: {
            title: "4. Data Retention",
            description: "We retain your information for as long as your account is active or as needed to provide you services. You can request data deletion by contacting our support team."
          }
        }
      },
      contactpage: {
        headline: 'Contact Us',
        text: "We're here to help! Reach out to us through any of the following channels",
        form: {
          headline: 'Get in Touch',
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          button: 'Send Message'
        },
        info: {
          headline: 'Contact Information',
          card1: {
            email: 'Email',
            contact: 'Contact Us'
          },
          card2: {
            chat: 'Live Chat',
            info: 'Available 24/7',
            contact: 'Start Chat'
          }
        }
      },
    }
  },
  ru: {
    translation: {
      auth: {
        loginTitle: 'С возвращением',
        registerTitle: 'Создать аккаунт',
        loginSubtitle: 'Войдите в свой аккаунт',
        registerSubtitle: 'Присоединяйтесь к нам',
        username: 'Имя пользователя',
        usernamePlaceholder: 'Введите имя пользователя',
        usernameRequired: 'Имя пользователя обязательно для заполнения',
        email: 'Email',
        emailPlaceholder: 'Введите email',
        emailRequired: 'Email обязателен для заполнения',
        referralCode: 'Реферальный код (необязательно)',
        referralCodePlaceholder: 'Введите реферальный код',
        password: 'Пароль',
        passwordPlaceholder: 'Введите пароль',
        passwordRequired: 'Пароль обязателен для заполнения',
        confirmPassword: 'Подтвердите пароль',
        confirmPasswordPlaceholder: 'Подтвердите пароль',
        loginButton: 'Войти',
        registerButton: 'Создать аккаунт',
        loading: 'Обработка...',
        error: 'Ошибка аутентификации',
        passwordMismatch: 'Пароли не совпадают',
        noAccount: 'Нет аккаунта? Зарегистрироваться',
        hasAccount: 'Уже есть аккаунт? Войти',
        forgotPassword: 'Забыли пароль?',
        logout: 'Выход',
        or: 'или',
        account: 'Мой аккаунт'
      },
      account: {
        dashboard: {
          dash: 'Панель управления',
          yourRefferal: 'Ваш реферальный код',
          yourRefferalLink: 'Ваша реферальная ссылка',
          totalRefferals: 'Всего рефералов',
          activeRefferals: 'Активные рефералы',
          totalEarnings: 'Всего заработано',
          recentReferrals: 'Недавние рефералы',
          recentNotFound: 'Недавние рефералы не найдены',
        },
        service: 'Услуги',
        billing: 'Транзакции',
        settings: 'Настройки',
        security: 'Безопасность',
        balance: 'Баланс',
        addFunds: 'Пополнить баланс',
        activeServices: 'Активные услуги',
        nextPayment: 'Следующий платеж',
        dueIn: 'Через',
        days: 'дней',
        recentActivity: 'Последние операции',
        cryptoPayment: {
          title: 'Оплата через Cryptomus',
          description: 'Оплатите любой криптовалютой',
          amount: 'Сумма пополнения (USD)',
          amountPlaceholder: 'Введите сумму',
          button: 'Пополнить через Cryptomus'
        },
        transactions: {
          title: 'История транзакций',
          date: 'Дата',
          method: 'Способ оплаты',
          amount: 'Сумма',
          status: 'Статус'
        },
        services: {
          yourServices: 'Ваши услуги',
          addNew: 'Добавить услугу',
          manage: 'Управление',
          renew: 'Продлить',
          expires: 'Истекает',
          status: {
            active: 'Активен',
            suspended: 'Приостановлен',
            expired: 'Истек'
          }
        },
        common: {
          comingSoon: 'Скоро будет доступно',
          loading: 'Загрузка...',
        }
      },
      menu: {
        home: 'Главная',
        services: {
          services: 'Услуги',
          virtual: 'Виртуальный Хостинг',
          domain: 'Регистрация Доменов'
        },
        referral: 'Реферальная система',
        about: {
          about: 'О Нас',
          company: 'Информация о Компании',
          terms: 'Правила Предоставления Услуг',
          privacy: 'Политика Конфиденциальности',
          contact: 'Контакты'
        }
      },
      hero: {
        title: 'Быстрый, Безопасный и Надежный Хостинг',
        subtitle: 'Начните Сегодня!',
        description: 'Испытайте корпоративные решения хостинга с непревзойденной производительностью, безопасностью и поддержкой 24/7.',
        getStarted: 'Начать',
        viewPlans: 'Посмотреть Тарифы'
      },
      features: {
        virtualHosting: {
          title: 'Быстрый Виртуальный Хостинг',
          description: 'Сверхбыстрые серверы с SSD хранилищем и оптимизированной производительностью'
        },
        vps: {
          title: 'Безопасная Аренда VPS/VDS',
          description: 'Выделенные ресурсы с полным root-доступом и гарантированной RAM'
        },
        security: {
          title: 'Защищенные Серверы',
          description: 'Усиленные меры безопасности с защитой от DDoS атак'
        },
        domains: {
          title: 'Простая Регистрация Доменов',
          description: 'Регистрация и управление доменами в один клик'
        }
      },
      pricing: {
        title: 'Выберите Свой Идеальный План',
        mostPopular: 'Самый Популярный',
        perMonth: '/месяц',
        getStart: 'Начать',
        plans: {
          starter: 'Базовый',
          professional: 'Профессиональный',
          enterprise: 'Премиальный'
        }
      },
      testimonials: {
        title: 'Что Говорят Наши Клиенты'
      },
      footer: {
        company: {
          company: 'Компания',
          about: 'О Нас',
          contact: 'Контакты',
        },
        services: {
          services: 'Услуги',
          hosting: 'Виртуальный Хостинг',
          domain: 'Домены'
        },
        support: {
          support: 'Поддержка',
          help: 'Центр поддержки',
        },
        legal: {
          legal: 'Юридическая информация',
          privacy: 'Политика Конфиденциальности',
          terms: 'Правила Предоставления Услуг',
          security: 'Безопастность'
        }
      },
      theme: {
        light: 'Светлая',
        dark: 'Темная'
      },
      companypage: {
        about: 'О Нашей Компании',
        slogan: 'Ваш надежный партнер в области веб-хостинга и облачных решений',
        company: {
          about: 'Мы - RetryHost',
          info1: 'Компания, предоставляющая услуги: виртуальный хостинг, аренда VDS/VPS, абузоустойчивых серверов и выделенных, регистрация доменов и дополнительные услуги хостинга. RETRY.HOST начал свой путь в 2021 году, а теперь предоставляет полный спектр услуг хостинга, мы уже набрали сотни доволных клиентов.',
          info2: 'Цены у нас действительно доступные, чтобы каждый мог воспользоваться услугами! Наши технические специалисты работают круглые сутки! Поддержка доступна и на английском языке.',
          card1: 'Активных Клиентов',
          card2: 'Зарегистрированных Доменов',
          card3: 'Поддержка',
          card4: 'Дата Центров'
        },
        cards: {
          customer: {
            headline: 'Клиент Превыше Всего',
            info: 'Мы ставим потребности наших клиентов превыше всего'
          },
          innovation: {
            headline: 'Инновации',
            info: 'Постоянно совершенствуем наши услуги и технологии'
          },
          reliability: {
            headline: 'Надежность',
            info: 'Мы стремимся предоставлять стабильные и безопасные услуги'
          },
          quality: {
            headline: 'Качество',
            info: 'Никогда не идем на компромисс с качеством наших услуг'
          },
        },
        news: 'Последние Новости'
      },
      domainpage: {
        registration: {
          title: 'Регистрация домена',
          subtitle: 'Найдите и зарегистрируйте идеальное доменное имя',
          searchPlaceholder: 'Введите имя домена',
          searchButton: 'Поиск',
        },
        features: {
          wideSelection: {
            title: 'Широкий выбор',
            description: 'Выбирайте из сотен доменных расширений',
          },
          domainPrivacy: {
            title: 'Конфиденциальность домена',
            description: 'Защитите свою личную информацию',
          },
          easyTransfer: {
            title: 'Лёгкий перенос',
            description: 'Простой процесс переноса домена',
          },
        },
        popularExtensions: {
          title: 'Популярные доменные расширения',
        },
        helpSection: {
          title: 'Нужна помощь?',
          description: 'Наши специалисты помогут вам выбрать и настроить домен',
          contactSupport: 'Связаться с поддержкой',
        },
        pricePerYear: 'год',
      },
      privacyPage: {
        title: "Политика конфиденциальности",
        lastUpdated: "Последнее обновление: 15 марта 2025 года",
        sections: {
          informationCollection: {
            title: "1. Сбор информации",
            description: "Мы собираем информацию, которую вы предоставляете нам напрямую, включая:",
            items: [
              "Информация об аккаунте (имя, email, данные для биллинга)",
              "Данные об использовании сервисов",
              "Предпочтения в коммуникации",
              "Техническая информация о ваших устройствах"
            ]
          },
          dataProtection: {
            title: "2. Защита данных",
            description: "Мы принимаем различные меры безопасности для защиты вашей личной информации:",
            items: [
              "Шифрование конфиденциальных данных",
              "Регулярные аудиты безопасности",
              "Контроль доступа и аутентификация",
              "Физическая безопасность"
            ]
          },
          informationUsage: {
            title: "3. Использование информации",
            description: "Мы используем собранную информацию для:",
            items: [
              "Предоставления и поддержки наших услуг",
              "Обработки ваших транзакций",
              "Отправки технических уведомлений и сообщений поддержки",
              "Коммуникации о акциях и обновлениях"
            ]
          },
          dataRetention: {
            title: "4. Хранение данных",
            description: "Мы храним вашу информацию, пока ваш аккаунт активен или пока это необходимо для предоставления вам услуг. Вы можете запросить удаление данных, связавшись с нашей службой поддержки."
          }
        }
      },
      contactpage: {
        headline: 'Наши Контакты',
        text: 'Мы здесь, чтобы помочь! Свяжитесь с нами по любому из следующих каналов',
        form: {
          headline: 'Свяжитесь с Нами',
          name: 'Имя',
          email: 'Электронная почта',
          subject: 'Тема',
          message: 'Сообщение',
          button: 'Отправить Сообщение'
        },
        info: {
          headline: 'Контактная информация',
          card1: {
            email: 'Электронная почта',
            contact: 'Связаться с Нами'
          },
          card2: {
            chat: 'Живой Чат',
            info: 'Доступно 24/7',
            contact: 'Начать Общение'
          }
        }
      },
    }
  }
};