/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { CheckCircle2, Circle, MonitorSmartphone, Code2, Cpu, GitBranch, Terminal, Copy, Check, LayoutTemplate, Navigation, FileCode2, Palette, Menu, Blocks, Smartphone, Home, BookOpen, Clock, Compass, Settings, Sun, Moon, Search, BellRing, Heart, Volume2, ChevronDown, Info, AlertCircle, ExternalLink, Network } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import groovy from 'react-syntax-highlighter/dist/esm/languages/prism/groovy';
import xml from 'react-syntax-highlighter/dist/esm/languages/prism/xml-doc';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('groovy', groovy);
SyntaxHighlighter.registerLanguage('xml', xml);

const initialRequirements = [
  { 
    id: '1', title: 'Android Studio', description: '(IDE الرسمي)', icon: MonitorSmartphone,
    details: {
      instructions: ['قم بتحميل البرنامج من الموقع الرسمي.', 'تأكد من تحديد Android SDK و Android Virtual Device أثناء التثبيت.', 'أكمل خطوات الإعداد الافتراضية (Standard Setup).'],
      troubleshooting: ['في حال فشل المحاكي، تأكد من تفعيل Virtualization (VT-x للمنصات Intel أو AMD-V للمنصات AMD) من إعدادات الـ BIOS.', 'إذا لم يتعرف النظام على SDK، تحقق من إعداد مسارات الـ SDK Path من الـ Settings.'],
      docsUrl: 'https://developer.android.com/studio'
    }
  },
  { 
    id: '2', title: 'JDK 11 أو أحدث', description: 'Java Development Kit', icon: Code2,
    details: {
      instructions: ['حمّل مسخة Oracle JDK أو OpenJDK إصدار 11 فما فوق لحاسوبك.', 'قم بتثبيت الحزمة بشكل اعتيادي.', 'انسخ مسار بيئة جافا وأضفه كمُتغير `JAVA_HOME` في إعدادات البيئة (Environment Variables).'],
      troubleshooting: ['افتح موجه الأوامر واكتب `java -version` للتأكد من نجاح التثبيت.', 'إذا ظهر لك خطأ "java is not recognized"، راجع إعدادات مسار Environment Variables وتأكد من إضافته للـ `Path`.'],
      docsUrl: 'https://www.oracle.com/java/technologies/downloads/'
    }
  },
  { 
    id: '3', title: 'SDK Android 31+', description: 'Software Development Kit', icon: Cpu,
    details: {
      instructions: ['افتح Android Studio واذهب إلى مُدير الـ SDK (SDK Manager) من زر الإعدادات.', 'تأكد من اختيار Android 12 (API level 31) أو أحدث في قائمة SDK Platforms.', 'انقر على Apply للبدء بتحميل وتثبيت الحُزم الأساسية.'],
      troubleshooting: ['تأكد من توفر مساحة كافية على جهازك (حوالي 2-3 جيجابايت لتحميل حزم SDK الأساسية).', 'لإظهار كافة الحزم المخفية وتحديد التفاصيل بدقة، ضع علامة الصح على خيار "Show Package Details".'],
      docsUrl: 'https://developer.android.com/about/versions/12'
    }
  },
  { 
    id: '4', title: 'Git', description: 'نظام التحكم في الإصدارات', icon: GitBranch,
    details: {
      instructions: ['حمل الملف التنفيذي لـ Git الخاص بنظامك.', 'خلال التثبيت، أبقِ الخيارات الافتراضية كما هي.', 'اربط حسابك بعد التثبيت بكتابة `git config --global user.name "Your Name"` في واجهة الـ Bash.'],
      troubleshooting: ['إذا لم يتعرف موجه الأوامر على أمر git، أعد تشغيل البرنامج/الجهاز لإنعاش المتغيرات.', 'للرفع إلى GitHub ستحتاج لاحقًا لتوليد Personal Access Token بدلاً من الباسورد.'],
      docsUrl: 'https://git-scm.com/downloads'
    }
  },
];

const quranSurahs = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
  "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
  "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
  "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
  "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
  "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
  "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
  "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
  "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
  "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
  "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
  "المسد", "الإخلاص", "الفلق", "الناس"
];

const snippet1 = `// مثال بسيط
fun main() {
    println("مرحباً بك في تطبيق المذكر")
}`;

const snippet2 = `package com.example.anamoslem

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.anamoslem.fragments.*
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        loadFragment(HomeFragment())

        val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_nav)
        bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.home -> loadFragment(HomeFragment())
                R.id.quran -> loadFragment(QuranFragment())
                R.id.prayer_times -> loadFragment(PrayerTimesFragment())
                R.id.qibla -> loadFragment(QiblaFragment())
                R.id.settings -> loadFragment(SettingsFragment())
            }
            true
        }
    }

    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }
}`;

const snippet3 = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottom_nav"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/dark_green"
        app:itemIconTint="@color/white"
        app:itemTextColor="@color/white"
        app:menu="@menu/bottom_menu" />
</LinearLayout>`;

const snippet4 = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="dark_green">#1B4D3E</color>
    <color name="green">#2D6A5C</color>
    <color name="gold">#D4AF37</color>
    <color name="white">#FFFFFF</color>
    <color name="black">#000000</color>
    <color name="light_gray">#F5F5F5</color>
</resources>`;

const snippet5 = `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/home"
        android:icon="@android:drawable/ic_menu_compass"
        android:title="الرئيسية" />
    <item
        android:id="@+id/quran"
        android:icon="@android:drawable/ic_menu_agenda"
        android:title="القرآن" />
    <item
        android:id="@+id/prayer_times"
        android:icon="@android:drawable/ic_menu_recent_history"
        android:title="الصلاة" />
    <item
        android:id="@+id/qibla"
        android:icon="@android:drawable/ic_menu_mylocation"
        android:title="القبلة" />
    <item
        android:id="@+id/settings"
        android:icon="@android:drawable/ic_menu_preferences"
        android:title="الإعدادات" />
</menu>`;

const snippet6 = `plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.anamoslem'
    compileSdk 34

    defaultConfig {
        applicationId "com.example.anamoslem"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }

    buildFeatures {
        viewBinding true
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
    
    // Retrofit for API calls
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
}`;

const snippet7 = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="أنا مسلم"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AnaMoslem"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

const snippet8 = `package com.example.anamoslem.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.anamoslem.R

class HomeFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        view.findViewById<View>(R.id.card_quran).setOnClickListener {
            Toast.makeText(context, "القرآن الكريم", Toast.LENGTH_SHORT).show()
        }
        view.findViewById<View>(R.id.card_azkar).setOnClickListener {
            Toast.makeText(context, "الأذكار", Toast.LENGTH_SHORT).show()
        }
        view.findViewById<View>(R.id.card_qibla).setOnClickListener {
            Toast.makeText(context, "اتجاه القبلة", Toast.LENGTH_SHORT).show()
        }
        view.findViewById<View>(R.id.card_hijri).setOnClickListener {
            Toast.makeText(context, "التقويم الهجري", Toast.LENGTH_SHORT).show()
        }
        view.findViewById<View>(R.id.card_dua).setOnClickListener {
            Toast.makeText(context, "الأدعية", Toast.LENGTH_SHORT).show()
        }
        view.findViewById<View>(R.id.card_hadith).setOnClickListener {
            Toast.makeText(context, "الأحاديث", Toast.LENGTH_SHORT).show()
        }

        return view
    }
}`;

const snippet9 = `package com.example.anamoslem.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.anamoslem.databinding.FragmentQuranBinding
import com.example.anamoslem.network.QuranApiService
import com.example.anamoslem.adapters.SurahAdapter
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class QuranFragment : Fragment() {
    private var _binding: FragmentQuranBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentQuranBinding.inflate(inflater, container, false)
        
        setupRecyclerView()
        fetchSurahs()
        
        return binding.root
    }

    private fun setupRecyclerView() {
        binding.rvQuran.layoutManager = LinearLayoutManager(requireContext())
    }

    private fun fetchSurahs() {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://api.alquran.cloud/v1/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(QuranApiService::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = apiService.getAllSurahs()
                withContext(Dispatchers.Main) {
                    if (response.code == 200) {
                        binding.rvQuran.adapter = SurahAdapter(response.data)
                    } else {
                        Toast.makeText(context, "فشل في جلب البيانات", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Log.e("QuranFragment", "Error: \${e.message}")
                    Toast.makeText(context, "حدث خطأ في الاتصال: تحقق من جودة الإنترنت", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}`;

const snippet10 = `package com.example.anamoslem.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.anamoslem.databinding.FragmentPrayerTimesBinding
import com.example.anamoslem.network.AladhanApiService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class PrayerTimesFragment : Fragment() {
    private var _binding: FragmentPrayerTimesBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPrayerTimesBinding.inflate(inflater, container, false)
        
        fetchPrayerTimes(30.0444, 31.2357) // Default Cairo coords
        
        return binding.root
    }

    private fun fetchPrayerTimes(lat: Double, lng: Double) {
        val retrofit = Retrofit.Builder()
            .baseUrl("https://api.aladhan.com/v1/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(AladhanApiService::class.java)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = apiService.getPrayerTimes(lat, lng)
                withContext(Dispatchers.Main) {
                    if (response.code == 200) {
                        val t = response.data.timings
                        binding.tvFajr.text = t.Fajr
                        binding.tvDhuhr.text = t.Dhuhr
                        binding.tvAsr.text = t.Asr
                        binding.tvMaghrib.text = t.Maghrib
                        binding.tvIsha.text = t.Isha
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(context, "فشل في جلب مواقيت الصلاة", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}`;

const snippet11 = `package com.example.anamoslem.fragments

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.Animation
import android.view.animation.RotateAnimation
import androidx.fragment.app.Fragment
import com.example.anamoslem.databinding.FragmentQiblaBinding

class QiblaFragment : Fragment(), SensorEventListener {
    private var _binding: FragmentQiblaBinding? = null
    private val binding get() = _binding!!

    private var sensorManager: SensorManager? = null
    private var accelerometer: Sensor? = null
    private var magnetometer: Sensor? = null

    private var lastAccelerometer = FloatArray(3)
    private var lastMagnetometer = FloatArray(3)
    private var lastAccelerometerSet = false
    private var lastMagnetometerSet = false

    private var currentDegree = 0f

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentQiblaBinding.inflate(inflater, container, false)
        
        sensorManager = requireActivity().getSystemService(Context.SENSOR_SERVICE) as SensorManager
        accelerometer = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        magnetometer = sensorManager?.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)

        return binding.root
    }

    override fun onResume() {
        super.onResume()
        sensorManager?.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_GAME)
        sensorManager?.registerListener(this, magnetometer, SensorManager.SENSOR_DELAY_GAME)
    }

    override fun onPause() {
        super.onPause()
        sensorManager?.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent) {
        if (event.sensor === accelerometer) {
            System.arraycopy(event.values, 0, lastAccelerometer, 0, event.values.size)
            lastAccelerometerSet = true
        } else if (event.sensor === magnetometer) {
            System.arraycopy(event.values, 0, lastMagnetometer, 0, event.values.size)
            lastMagnetometerSet = true
        }

        if (lastAccelerometerSet && lastMagnetometerSet) {
            val rotationMatrix = FloatArray(9)
            val orientation = FloatArray(3)

            if (SensorManager.getRotationMatrix(rotationMatrix, null, lastAccelerometer, lastMagnetometer)) {
                SensorManager.getOrientation(rotationMatrix, orientation)
                val azimuthInRadians = orientation[0]
                val azimuthInDegrees = Math.toDegrees(azimuthInRadians.toDouble()).toFloat()

                val ra = RotateAnimation(
                    currentDegree,
                    -azimuthInDegrees,
                    Animation.RELATIVE_TO_SELF, 0.5f,
                    Animation.RELATIVE_TO_SELF, 0.5f
                )

                ra.duration = 250
                ra.fillAfter = true

                binding.ivCompass.startAnimation(ra)
                currentDegree = -azimuthInDegrees
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}`;

const snippet12 = `package com.example.anamoslem.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.anamoslem.databinding.FragmentSettingsBinding
import com.google.firebase.auth.FirebaseAuth

class SettingsFragment : Fragment() {
    private var _binding: FragmentSettingsBinding? = null
    private val binding get() = _binding!!
    private lateinit var auth: FirebaseAuth

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentSettingsBinding.inflate(inflater, container, false)
        auth = FirebaseAuth.getInstance()
        
        setupAuthUI()
        
        return binding.root
    }

    private fun setupAuthUI() {
        val currentUser = auth.currentUser
        if (currentUser != null) {
            binding.layoutAuth.visibility = View.GONE
            binding.layoutUserSession.visibility = View.VISIBLE
            binding.tvUserEmail.text = currentUser.email
        } else {
            binding.layoutAuth.visibility = View.VISIBLE
            binding.layoutUserSession.visibility = View.GONE
        }

        binding.btnSignUp.setOnClickListener {
            val email = binding.etEmail.text.toString()
            val password = binding.etPassword.text.toString()
            if (email.isNotEmpty() && password.isNotEmpty()) {
                auth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if (task.isSuccessful) {
                            Toast.makeText(context, "تم التسجيل بنجاح", Toast.LENGTH_SHORT).show()
                            setupAuthUI()
                        } else {
                            Toast.makeText(context, "فشل التسجيل: \${task.exception?.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
            }
        }

        binding.btnLogin.setOnClickListener {
            val email = binding.etEmail.text.toString()
            val password = binding.etPassword.text.toString()
            if (email.isNotEmpty() && password.isNotEmpty()) {
                auth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener { task ->
                        if (task.isSuccessful) {
                            Toast.makeText(context, "تم دخولك بنجاح", Toast.LENGTH_SHORT).show()
                            setupAuthUI()
                        } else {
                            Toast.makeText(context, "فشل الدخول: \${task.exception?.message}", Toast.LENGTH_SHORT).show()
                        }
                    }
            }
        }

        binding.btnSignOut.setOnClickListener {
            auth.signOut()
            setupAuthUI()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}`;

const snippet13 = `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/light_gray">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="الإعدادات"
            android:textSize="24sp"
            android:textStyle="bold"
            android:textColor="@color/dark_green"
            android:gravity="center"
            android:layout_marginBottom="24dp"/>

        <!-- User Authentication Section -->
        <androidx.cardview.widget.CardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginBottom="16dp"
            app:cardCornerRadius="16dp"
            app:cardElevation="4dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="حساب المستخدم"
                    android:textStyle="bold"
                    android:textColor="@color/dark_green"
                    android:layout_marginBottom="12dp"/>

                <!-- Auth UI -->
                <LinearLayout
                    android:id="@+id/layoutAuth"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:orientation="vertical">

                    <EditText
                        android:id="@+id/etEmail"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:hint="البريد الإلكتروني"
                        android:inputType="textEmailAddress"
                        android:layout_marginBottom="8dp"/>

                    <EditText
                        android:id="@+id/etPassword"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:hint="كلمة المرور"
                        android:inputType="textPassword"
                        android:layout_marginBottom="16dp"/>

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="horizontal">

                        <Button
                            android:id="@+id/btnLogin"
                            android:layout_width="0dp"
                            android:layout_height="wrap_content"
                            android:layout_weight="1"
                            android:text="دخول"
                            android:layout_marginEnd="4dp"
                            android:backgroundTint="@color/dark_green"/>

                        <Button
                            android:id="@+id/btnSignUp"
                            android:layout_width="0dp"
                            android:layout_height="wrap_content"
                            android:layout_weight="1"
                            android:text="تسجيل"
                            android:layout_marginStart="4dp"
                            android:backgroundTint="@color/gold"/>

                    </LinearLayout>
                </LinearLayout>

                <!-- Session UI -->
                <LinearLayout
                    android:id="@+id/layoutUserSession"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:orientation="vertical"
                    android:visibility="gone">

                    <TextView
                        android:id="@+id/tvUserEmail"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:text="user@example.com"
                        android:layout_marginBottom="12dp"/>

                    <Button
                        android:id="@+id/btnSignOut"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:text="خروج"
                        android:backgroundTint="@color/green"/>
                </LinearLayout>

            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <!-- Grid Row 1 -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:layout_marginBottom="12dp">

            <androidx.cardview.widget.CardView
                android:id="@+id/card_quran"
                android:layout_width="0dp"
                android:layout_height="120dp"
                android:layout_weight="1"
                android:layout_marginEnd="6dp"
                android:clickable="true"
                android:focusable="true"
                app:cardBackgroundColor="@color/white"
                app:cardCornerRadius="12dp"
                app:cardElevation="2dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="📖"
                        android:textSize="36sp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="القرآن الكريم"
                        android:textColor="@color/dark_green"
                        android:textSize="14sp"
                        android:textStyle="bold"
                        android:layout_marginTop="8dp"/>
                </LinearLayout>
            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:id="@+id/card_azkar"
                android:layout_width="0dp"
                android:layout_height="120dp"
                android:layout_weight="1"
                android:layout_marginStart="6dp"
                android:clickable="true"
                android:focusable="true"
                app:cardBackgroundColor="@color/white"
                app:cardCornerRadius="12dp"
                app:cardElevation="2dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="🔔"
                        android:textSize="36sp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="الأذكار"
                        android:textColor="@color/dark_green"
                        android:textSize="14sp"
                        android:textStyle="bold"
                        android:layout_marginTop="8dp"/>
                </LinearLayout>
            </androidx.cardview.widget.CardView>
        </LinearLayout>

        <!-- Grid Row 2 -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:layout_marginBottom="12dp">

            <androidx.cardview.widget.CardView
                android:id="@+id/card_qibla"
                android:layout_width="0dp"
                android:layout_height="120dp"
                android:layout_weight="1"
                android:layout_marginEnd="6dp"
                android:clickable="true"
                android:focusable="true"
                app:cardBackgroundColor="@color/white"
                app:cardCornerRadius="12dp"
                app:cardElevation="2dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="🧭"
                        android:textSize="36sp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="اتجاه القبلة"
                        android:textColor="@color/dark_green"
                        android:textSize="14sp"
                        android:textStyle="bold"
                        android:layout_marginTop="8dp"/>
                </LinearLayout>
            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:id="@+id/card_hijri"
                android:layout_width="0dp"
                android:layout_height="120dp"
                android:layout_weight="1"
                android:layout_marginStart="6dp"
                android:clickable="true"
                android:focusable="true"
                app:cardBackgroundColor="@color/white"
                app:cardCornerRadius="12dp"
                app:cardElevation="2dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="📅"
                        android:textSize="36sp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="التقويم الهجري"
                        android:textColor="@color/dark_green"
                        android:textSize="14sp"
                        android:textStyle="bold"
                        android:layout_marginTop="8dp"/>
                </LinearLayout>
            </androidx.cardview.widget.CardView>
        </LinearLayout>

        <!-- Grid Row 3 -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <androidx.cardview.widget.CardView
                android:id="@+id/card_dua"
                android:layout_width="0dp"
                android:layout_height="120dp"
                android:layout_weight="1"
                android:layout_marginEnd="6dp"
                android:clickable="true"
                android:focusable="true"
                app:cardBackgroundColor="@color/white"
                app:cardCornerRadius="12dp"
                app:cardElevation="2dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="🤲"
                        android:textSize="36sp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="الأدعية"
                        android:textColor="@color/dark_green"
                        android:textSize="14sp"
                        android:textStyle="bold"
                        android:layout_marginTop="8dp"/>
                </LinearLayout>
            </androidx.cardview.widget.CardView>

            <androidx.cardview.widget.CardView
                android:id="@+id/card_hadith"
                android:layout_width="0dp"
                android:layout_height="120dp"
                android:layout_weight="1"
                android:layout_marginStart="6dp"
                android:clickable="true"
                android:focusable="true"
                app:cardBackgroundColor="@color/white"
                app:cardCornerRadius="12dp"
                app:cardElevation="2dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:orientation="vertical"
                    android:gravity="center">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="📜"
                        android:textSize="36sp"/>

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="الأحاديث"
                        android:textColor="@color/dark_green"
                        android:textSize="14sp"
                        android:textStyle="bold"
                        android:layout_marginTop="8dp"/>
                </LinearLayout>
            </androidx.cardview.widget.CardView>
        </LinearLayout>

    </LinearLayout>
</ScrollView>`;

const snippet14 = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@color/light_gray">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="📖 القرآن الكريم"
        android:textSize="24sp"
        android:textStyle="bold"
        android:textColor="@color/dark_green"
        android:gravity="center"
        android:padding="20dp"
        android:background="@color/white"/>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvQuran"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="8dp"
        android:clipToPadding="false"/>

</LinearLayout>`;

const snippet15 = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    android:background="@color/light_gray">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="🕌 مواقيت الصلاة"
        android:textSize="24sp"
        android:textStyle="bold"
        android:textColor="@color/dark_green"
        android:gravity="center"
        android:padding="16dp"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="16dp"
        android:background="@color/white">
        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="الفجر"
            android:textSize="18sp"
            android:textColor="@color/dark_green"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="04:25 ص"
            android:textSize="18sp"
            android:textStyle="bold"
            android:textColor="@color/gold"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="16dp"
        android:layout_marginTop="1dp"
        android:background="@color/white">
        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="الظهر"
            android:textSize="18sp"
            android:textColor="@color/dark_green"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="12:15 م"
            android:textSize="18sp"
            android:textStyle="bold"
            android:textColor="@color/gold"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="16dp"
        android:layout_marginTop="1dp"
        android:background="@color/white">
        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="العصر"
            android:textSize="18sp"
            android:textColor="@color/dark_green"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="03:45 م"
            android:textSize="18sp"
            android:textStyle="bold"
            android:textColor="@color/gold"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="16dp"
        android:layout_marginTop="1dp"
        android:background="@color/white">
        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="المغرب"
            android:textSize="18sp"
            android:textColor="@color/dark_green"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="06:30 م"
            android:textSize="18sp"
            android:textStyle="bold"
            android:textColor="@color/gold"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:padding="16dp"
        android:layout_marginTop="1dp"
        android:background="@color/white">
        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="العشاء"
            android:textSize="18sp"
            android:textColor="@color/dark_green"/>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="08:00 م"
            android:textSize="18sp"
            android:textStyle="bold"
            android:textColor="@color/gold"/>
    </LinearLayout>

</LinearLayout>`;

const snippet16 = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">المذكر </string>
</resources>`;

const snippet17 = `<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="Theme.AnaMoslem" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/dark_green</item>
        <item name="colorPrimaryVariant">@color/green</item>
        <item name="colorOnPrimary">@color/white</item>
        <item name="colorSecondary">@color/gold</item>
        <item name="android:statusBarColor" tools:targetApi="l">@color/dark_green</item>
    </style>
</resources>`;

const snippet18 = `package com.example.anamoslem.network

import retrofit2.http.GET

interface QuranApiService {
    @GET("surah")
    suspend fun getAllSurahs(): SurahResponse
}

data class SurahResponse(
    val code: Int,
    val status: String,
    val data: List<Surah>
)

data class Surah(
    val number: Int,
    val name: String,
    val englishName: String,
    val numberOfAyahs: Int,
    val revelationType: String
)`;

const snippet19 = `package com.example.anamoslem.network

import retrofit2.http.GET
import retrofit2.http.Query

interface AladhanApiService {
    @GET("timings")
    suspend fun getPrayerTimes(
        @Query("latitude") lat: Double,
        @Query("longitude") lng: Double,
        @Query("method") method: Int = 4
    ): PrayerResponse
}

data class PrayerResponse(
    val code: Int,
    val status: String,
    val data: PrayerData
)

data class PrayerData(
    val timings: Timings
)

data class Timings(
    val Fajr: String,
    val Dhuhr: String,
    val Asr: String,
    val Maghrib: String,
    val Isha: String
)`;

const snippet20 = `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/light_gray"
    android:padding="16dp">

    <TextView
        android:id="@+id/tvQiblaTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="اتصل بالقبلة"
        android:textSize="24sp"
        android:textStyle="bold"
        android:textColor="@color/dark_green"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="40dp"/>

    <FrameLayout
        android:layout_width="320dp"
        android:layout_height="320dp"
        android:layout_centerInParent="true">

        <ImageView
            android:id="@+id/ivCompass"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:src="@drawable/ic_compass_main"
            android:layout_gravity="center"/>

        <ImageView
            android:id="@+id/ivQiblaIndicator"
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:src="@drawable/ic_qibla_mark"
            android:layout_gravity="top|center_horizontal"
            android:layout_marginTop="20dp"/>

    </FrameLayout>

    <TextView
        android:id="@+id/tvQiblaDegree"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="255°"
        android:textSize="32sp"
        android:textStyle="bold"
        android:textColor="@color/gold"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="80dp"/>

</RelativeLayout>`;

function CodeCard({ 
  title, 
  filename, 
  language = "kotlin",
  code, 
  description, 
  icon: Icon, 
  iconColor,
  delay
}: { 
  title: string; 
  filename: string;
  language?: string;
  code: string; 
  description: React.ReactNode; 
  icon: any; 
  iconColor: string;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#0B1321] rounded-3xl shadow-xl overflow-hidden border border-slate-800"
    >
      <div className="p-6 bg-[#050A15] border-b border-slate-800 text-white">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg">
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-100">{title}</h2>
              <p className="text-xs text-slate-400 mt-1" dir="ltr">{filename}</p>
            </div>
          </div>
          <button 
            onClick={handleCopy} 
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors duration-200 group"
            title="نسخ الكود"
          >
            {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />}
          </button>
        </div>
        
        <div className="bg-[#0f172a] rounded-2xl overflow-hidden text-left border border-white/5 shadow-inner" dir="ltr">
          <SyntaxHighlighter 
            language={language} 
            style={vscDarkPlus} 
            customStyle={{ margin: 0, padding: '1.25rem', fontSize: '13px', background: 'transparent' }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="p-5 bg-[#0B1321] flex items-start gap-4">
         <div className="flex-1">
           <p className="text-slate-300 text-sm leading-relaxed font-medium">
              {description}
           </p>
         </div>
      </div>
    </motion.div>
  );
}

import { AppPreviewMockup } from "./AppPreviewMockup";

function OldAppPreviewMockup() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeNotification, setActiveNotification] = useState<null | 'adhan' | 'istighfar'>(null);

  const triggerNotif = (type: 'adhan' | 'istighfar') => {
    setActiveNotification(type);

    // تشغيل صوت التنبيه
    const audioUrl = type === 'adhan' 
      ? 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' 
      : 'https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3';
      
    const audio = new Audio(audioUrl);
    audio.play().catch(e => console.log('Audio error:', e));

    setTimeout(() => setActiveNotification(null), 4000);
  };

  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'quran', label: 'القرآن', icon: BookOpen },
    { id: 'prayer', label: 'الصلاة', icon: Clock },
    { id: 'qibla', label: 'القبلة', icon: Compass },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center p-8 relative"
    >
        <div className="w-full flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Smartphone className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">معاينة تفاعلية للتطبيق</h2>
                <p className="text-sm text-slate-600 font-medium">جرب واجهة تطبيق "المذكر"</p>
              </div>
            </div>
        </div>

        {/* 3D Phone Frame */}
        <div className="relative group perspective-1000 mt-6 mb-4">
            {/* Phone Physical Volume/Power Buttons */}
            <div className="absolute -left-[14px] top-24 w-[14px] h-12 bg-slate-800 rounded-l-md shadow-inner border-l border-y border-slate-700 z-0"></div>
            <div className="absolute -left-[14px] top-40 w-[14px] h-20 bg-slate-800 rounded-l-md shadow-inner border-l border-y border-slate-700 z-0"></div>
            <div className="absolute -right-[14px] top-32 w-[14px] h-16 bg-slate-800 rounded-r-md shadow-inner border-r border-y border-slate-700 z-0"></div>

            <div className={`w-[320px] h-[650px] ${isDarkMode ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-800'} rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5),_inset_0_4px_15px_rgba(255,255,255,0.2),_inset_0_-4px_20px_rgba(0,0,0,0.5)] border-[14px] relative overflow-hidden flex flex-col transition-all duration-500 transform group-hover:rotate-y-1 group-hover:-rotate-x-1 z-10`}>
            {/* Top Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
               <div className={`w-36 h-7 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-800'} rounded-b-2xl transition-colors duration-300`}></div>
            </div>

            {/* Appbar */}
            <div className={`${isDarkMode ? 'bg-[#0f2e24]' : 'bg-[#1B4D3E]'} pt-14 pb-4 text-center z-10 shadow-md flex justify-center transition-colors duration-300 relative`}>
                <h3 className="text-white font-bold text-lg tracking-wide">المذكر</h3>
            </div>

            {/* Notification Overlay */}
            <AnimatePresence>
                {activeNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute top-12 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl z-50 flex items-start gap-3 border border-gray-100"
                    >
                        <div className="bg-emerald-100 p-2.5 rounded-full flex-shrink-0">
                            {activeNotification === 'adhan' ? (
                                <Volume2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                                <Heart className="w-5 h-5 text-emerald-600" />
                            )}
                        </div>
                        <div className="flex-1 text-right mt-0.5">
                            <h4 className="font-bold text-gray-900 leading-tight">
                                {activeNotification === 'adhan' ? 'حان الآن موعد أذان العصر' : 'تذكير بالاستغفار'}
                            </h4>
                            <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                                {activeNotification === 'adhan' 
                                    ? 'بتوقيت مدينتك الحالية. حان وقت الصلاة، تقبل الله طاعتكم.' 
                                    : 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه 📿'}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-[#F2F4F7]'} overflow-y-auto p-4 flex flex-col transition-colors duration-300 relative shadow-inner`}>
                {activeTab === 'home' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="bg-gradient-to-r from-[#2D6A5C] to-[#1B4D3E] p-5 rounded-[20px] text-white shadow-[0_10px_20px_rgba(27,77,62,0.3)] border-t border-white/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform -translate-x-10 -translate-y-10"></div>
                            <p className="text-sm opacity-90 mb-1 font-medium">الصلاة القادمة</p>
                            <h4 className="text-3xl font-bold mb-1">العصر</h4>
                            <p className="text-sm font-mono opacity-80">03:45 PM</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={`${isDarkMode ? 'bg-slate-800 text-emerald-400 border-slate-700/50' : 'bg-white text-[#1B4D3E] border-white'} p-4 justify-center rounded-[20px] shadow-[0_8px_15px_rgba(0,0,0,0.05)] border-t-2 border-l-2 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1`}>
                                <BookOpen className="w-8 h-8" />
                                <span className="text-sm font-bold">ورد اليوم</span>
                            </div>
                            <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700/50' : 'bg-white border-white'} p-4 justify-center rounded-[20px] shadow-[0_8px_15px_rgba(0,0,0,0.05)] border-t-2 border-l-2 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1`}>
                                <span className="text-3xl drop-shadow-md">📿</span>
                                <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-gray-700'}`}>المسبحة</span>
                            </div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700/50' : 'bg-white border-white'} p-5 rounded-[20px] shadow-[0_8px_15px_rgba(0,0,0,0.05)] border-t-2 border-l-2 transition-all duration-300 hover:-translate-y-0.5`}>
                            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-medium mb-2`}>تاريخ اليوم</p>
                            <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>١٥ شوال ١٤٤٧ هـ</p>
                        </div>
                    </motion.div>
                )}
                {activeTab === 'quran' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col pt-1 gap-4">
                        <div className={`p-4 rounded-[20px] flex items-center justify-between ${isDarkMode ? 'bg-slate-800 border-t border-slate-700 shadow-xl' : 'bg-gradient-to-r from-[#2D6A5C] to-[#1B4D3E] shadow-[0_10px_20px_rgba(27,77,62,0.3)]'} text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer`}>
                            <div>
                                <p className="text-xs text-emerald-100/80 mb-1.5 font-medium">متابعة القراءة</p>
                                <h4 className="font-bold text-xl mb-0.5 drop-shadow-md">سورة الكهف</h4>
                                <p className="text-xs text-emerald-200 mt-1">الآية 10 • الجزء 15</p>
                            </div>
                            <BookOpen className="w-12 h-12 opacity-40 drop-shadow-lg" />
                        </div>
                        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                            <h5 className={`font-bold mt-2 mb-3 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-800'} transition-colors`}>سور القرآن الكريم (114)</h5>
                            <div className="space-y-3 pb-2">
                                {quranSurahs.map((surah, idx) => (
                                    <div key={surah} className={`p-3.5 rounded-2xl flex items-center justify-between ${isDarkMode ? 'bg-slate-800 text-slate-200 border-t border-l border-slate-700 shadow-md' : 'bg-white text-slate-800 border-t border-l border-white shadow-[0_4px_10px_rgba(0,0,0,0.03)]'} transition-all hover:-translate-y-0.5 cursor-pointer`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${isDarkMode ? 'bg-slate-700 text-emerald-400' : 'bg-emerald-50 text-[#1B4D3E]'} shadow-inner`}>
                                                {idx + 1}
                                            </div>
                                            <span className="font-bold text-[14px]">سورة {surah}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
                {activeTab === 'prayer' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                       {['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء'].map((p, i) => (
                           <div key={p} className={`${isDarkMode ? 'bg-slate-800 border-t border-slate-700 shadow-md' : 'bg-white border-t border-white shadow-[0_4px_10px_rgba(0,0,0,0.03)]'} p-4 rounded-[18px] flex justify-between items-center transition-all hover:scale-[1.01] ${p === 'العصر' ? (isDarkMode ? 'ring-2 ring-emerald-500/50 bg-emerald-900/20' : 'ring-2 ring-[#2D6A5C] bg-[#ecfdf5]') : (isDarkMode ? 'text-slate-200' : 'text-gray-800')}`}>
                               <span className={`font-semibold ${p === 'العصر' ? (isDarkMode ? 'text-emerald-400' : 'text-[#1B4D3E]') : ''}`}>{p}</span>
                               <span className={`text-sm font-mono ${p === 'العصر' ? (isDarkMode ? 'text-emerald-400' : 'text-[#2D6A5C]') + ' font-bold' : (isDarkMode ? 'text-slate-400' : 'text-slate-600') + ' font-medium'}`}>00:00</span>
                           </div>
                       ))}
                    </motion.div>
                )}
                {activeTab === 'qibla' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center relative">
                        <div className={`w-48 h-48 rounded-full border-4 ${isDarkMode ? 'border-emerald-500/20 bg-slate-800/80' : 'border-[#2D6A5C]/30 bg-white/80'} flex items-center justify-center relative shadow-inner transition-colors duration-300`}>
                            <div className={`w-40 h-40 rounded-full border ${isDarkMode ? 'border-emerald-500/30 bg-slate-800' : 'border-[#2D6A5C]/20 bg-white'} flex items-center justify-center shadow-md transition-colors duration-300`}>
                               <Compass className="w-24 h-24 text-[#D4AF37] absolute transform -rotate-45 drop-shadow-md" />
                            </div>
                        </div>
                        <p className={`mt-10 text-sm font-bold px-4 py-2 rounded-full ${isDarkMode ? 'text-slate-300 bg-slate-800' : 'text-slate-700 bg-slate-200/80'} transition-colors duration-300`}>يتطلب تحديد الموقع</p>
                    </motion.div>
                )}
                {activeTab === 'settings' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`${isDarkMode ? 'bg-slate-800 border-t border-slate-700 shadow-md text-slate-200' : 'bg-white border-t border-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-slate-800'} p-4 rounded-[18px] flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01]`}
                        >
                            <div className="flex items-center gap-3">
                                {isDarkMode ? <Moon className="w-5 h-5 text-indigo-400 drop-shadow-md" /> : <Sun className="w-5 h-5 text-amber-500 drop-shadow-md" />}
                                <span className="font-bold text-sm">الوضع الليلي</span>
                            </div>
                            <div className={`w-12 h-7 flex items-center rounded-full p-1 shadow-inner transition-colors duration-300 ${isDarkMode ? 'bg-[#2D6A5C]' : 'bg-slate-200'}`} dir="ltr">
                                <div className={`w-5 h-5 bg-white rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.2)] transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-slate-800 border-t border-slate-700 shadow-md text-slate-200' : 'bg-white border-t border-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-slate-800'} p-4 rounded-[18px] flex items-center justify-between transition-all hover:scale-[1.01]`}>
                            <div className="flex items-center gap-3">
                                <Volume2 className={`w-5 h-5 drop-shadow-sm ${isDarkMode ? 'text-emerald-400' : 'text-[#1B4D3E]'}`} />
                                <span className="font-bold text-sm">إشعارات الأذان</span>
                            </div>
                            <button 
                                onClick={() => triggerNotif('adhan')}
                                className={`text-[11px] font-bold px-3.5 py-1.5 rounded-lg active:scale-95 shadow-sm border-t ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' : 'bg-[#F2F4F7] border-white text-gray-700 hover:bg-gray-200'} transition-all`}
                            >
                                تجربة
                            </button>
                        </div>
                        <div className={`${isDarkMode ? 'bg-slate-800 border-t border-slate-700 shadow-md text-slate-200' : 'bg-white border-t border-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-slate-800'} p-4 rounded-[18px] flex items-center justify-between transition-all hover:scale-[1.01]`}>
                            <div className="flex items-center gap-3">
                                <Heart className={`w-5 h-5 drop-shadow-sm ${isDarkMode ? 'text-emerald-400' : 'text-[#1B4D3E]'}`} />
                                <span className="font-bold text-sm">تذكير بالاستغفار</span>
                            </div>
                            <button 
                                onClick={() => triggerNotif('istighfar')}
                                className={`text-[11px] font-bold px-3.5 py-1.5 rounded-lg active:scale-95 shadow-sm border-t ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' : 'bg-[#F2F4F7] border-white text-gray-700 hover:bg-gray-200'} transition-all`}
                            >
                                تجربة
                            </button>
                        </div>
                        <div className={`${isDarkMode ? 'bg-slate-800 border-t border-slate-700 shadow-md text-slate-200' : 'bg-white border-t border-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-slate-800'} p-4 rounded-[18px] flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.01]`}>
                            <Terminal className={`w-5 h-5 drop-shadow-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                            <span className="font-bold text-sm">عن التطبيق</span>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Bottom Nav */}
            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'} border-t flex justify-between items-center px-1 pb-6 pt-3 shadow-[0_-4px_15px_-1px_rgba(0,0,0,0.05)] z-10 relative transition-colors duration-300`}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const TIcon = tab.icon;
                    return (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${isActive ? (isDarkMode ? 'text-emerald-400' : 'text-[#1B4D3E]') : (isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-800')}`}
                        >
                            <div className={`${isActive ? (isDarkMode ? 'bg-emerald-900/40 border-emerald-500/20' : 'bg-[#ecfdf5] border-[#1B4D3E]/10') + ' px-4 py-1.5 rounded-full mb-1 shadow-sm border' : 'mb-1'}`}>
                               <TIcon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                            </div>
                            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
                        </button>
                    )
                })}
            </div>
          </div>
        </div>
    </motion.div>
  );
}

export default function App() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const progress = (checkedItems.size / initialRequirements.length) * 100;
  const isReady = progress === 100;

  const filteredRequirements = initialRequirements.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center py-10 px-4 font-sans text-slate-100" dir="rtl">
      {/* Decorative App Header Area */}
      <div className="w-full max-w-xl mx-auto mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/30 to-emerald-500/10 rounded-3xl blur-3xl -z-10"></div>
          <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-700 to-[#1B4D3E] rounded-[1.8rem] shadow-[0_15px_30px_rgba(8,145,178,0.2)] flex items-center justify-center border border-cyan-500/20 mb-2 relative group hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-white/10 rounded-[1.8rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Smartphone className="w-10 h-10 text-cyan-50" />
              </div>
              <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm">
                      تطبيق <span className="text-cyan-400">"المذكر"</span>
                  </h1>
                  <p className="text-base sm:text-lg text-slate-400 max-w-md mx-auto font-medium leading-relaxed">
                      المرجع الشامل للمطور لعمل واجهة وتصميم تطبيق إسلامي متكامل باستخدام Android Studio
                  </p>
              </div>
          </div>
      </div>

      <div className="max-w-xl w-full space-y-8">
        
        {/* Card 1: Setup Checklist */}
        <div className="bg-[#0B1321] rounded-3xl shadow-2xl overflow-hidden border border-slate-800 relative">
          <div className="bg-gradient-to-br from-cyan-900 to-[#0A1828] p-8 text-white relative overflow-hidden">
            {/* Pattern */}
            <div className="absolute -right-10 -top-10 opacity-5 blur-[1px]">
               <BookOpen className="w-48 h-48" />
            </div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="text-right">
                <h2 className="text-2xl font-extrabold tracking-tight">إعداد بيئة العمل</h2>
                <p className="text-cyan-200 text-sm mt-1.5 opacity-90 font-medium">خطوات تطوير تطبيق المذكر</p>
              </div>
              <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md shadow-inner border border-white/5">
                <MonitorSmartphone className="w-7 h-7 text-cyan-100" />
              </div>
            </div>

            <div className="mb-2 flex justify-between items-end text-sm font-bold relative z-10">
              <span>نسبة جاهزية البيئة</span>
              <span className="text-cyan-200">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 w-full bg-[#050A14] rounded-full overflow-hidden shadow-inner relative z-10 border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن المتطلبات (مثال: SDK, Git...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-2xl border border-slate-700 bg-slate-900/50 py-3.5 pr-10 pl-4 text-sm text-slate-200 outline-none transition-all focus:border-cyan-500 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-500/10 placeholder-slate-500"
              />
            </div>
            <div className="space-y-4">
              {filteredRequirements.map((item) => {
                const isChecked = checkedItems.has(item.id);
                const isExpanded = expandedItems.has(item.id);
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      backgroundColor: isChecked ? '#0B1E2E' : '#131E32',
                      borderColor: isChecked ? '#1FA2B6' : '#1E293B'
                    }}
                    className={`flex flex-col p-4 rounded-2xl border-2 hover:shadow-lg transition-all group cursor-pointer shadow-md`}
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(item.id);
                        }}
                        className={`flex-shrink-0 transition-colors ${isChecked ? 'text-cyan-400' : 'text-slate-500 hover:text-cyan-300'}`}
                      >
                        {isChecked ? <CheckCircle2 className="w-7 h-7 fill-cyan-900/50" /> : <Circle className="w-7 h-7" />}
                      </button>

                      <div className="flex-1">
                        <h3 className={`font-semibold transition-colors ${isChecked ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm mt-0.5 transition-colors ${isChecked ? 'text-cyan-500' : 'text-slate-400'}`}>
                          {item.description}
                        </p>
                      </div>

                      <div className={`p-2.5 rounded-xl transition-colors ${isChecked ? 'bg-cyan-900/40 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div 
                            className={`mt-4 pt-4 border-t ${isChecked ? 'border-cyan-800/50' : 'border-slate-700'} space-y-4`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div>
                              <h4 className={`text-sm font-bold flex items-center gap-1.5 mb-2 ${isChecked ? 'text-cyan-400' : 'text-slate-300'}`}>
                                <Info className="w-4 h-4" /> التفاصيل والخطوات:
                              </h4>
                              <ul className="space-y-1.5 text-sm list-disc list-inside">
                                {item.details.instructions.map((inst, i) => (
                                  <li key={i} className={`${isChecked ? 'text-cyan-100' : 'text-slate-400'}`}>{inst}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className={`text-sm font-bold flex items-center gap-1.5 mb-2 ${isChecked ? 'text-cyan-400' : 'text-slate-300'}`}>
                                <AlertCircle className="w-4 h-4 text-orange-400" /> حل المشاكل الشائعة:
                              </h4>
                              <ul className="space-y-1.5 text-sm list-disc list-inside">
                                {item.details.troubleshooting.map((trouble, i) => (
                                  <li key={i} className={`${isChecked ? 'text-cyan-100' : 'text-slate-400'}`}>{trouble}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2">
                              <a
                                href={item.details.docsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 text-sm font-bold hover:underline transition-colors ${isChecked ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-400 hover:text-blue-300'}`}
                              >
                                <span>التوثيق الرسمي</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              
              {filteredRequirements.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6 text-slate-500" />
                  </div>
                  <h3 className="text-slate-200 font-bold mb-1">لا توجد نتائج مطابقة</h3>
                  <p className="text-sm text-slate-400 font-medium">
                    لم نتمكن من العثور على أي متطلبات تطابق بحثك
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 pt-2 bg-[#0B1321] text-center text-sm font-bold border-t border-slate-800">
            <motion.p 
              initial={false}
              animate={{ 
                color: isReady ? '#22D3EE' : '#64748B',
                scale: isReady ? 1.05 : 1
              }}
            >
             {isReady ? 'أنت جاهز تماماً للبدء بكتابة الكود! 🚀' : 'أكمل متطلبات البيئة לبدء ظهور الواجهات ☝️'}
            </motion.p>
          </div>
        </div>

        {isReady && (
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="space-y-8"
          >
            {/* Card 2: App Structure */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#0B1321] rounded-3xl shadow-xl overflow-hidden border border-slate-800 relative"
            >
              <div className="p-6 bg-[#050A15] border-b border-slate-800 text-white">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <LayoutTemplate className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-100">هيكلة مجلدات المشروع</h2>
                      <p className="text-xs text-gray-400 mt-1">تفريعة ملفات تطبيق "أنا مسلم"</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#0f172a] p-5 rounded-2xl overflow-x-auto text-left border border-white/5 shadow-inner" dir="ltr">
                  <div className="font-mono text-[13px] sm:text-[14px] leading-[1.7] text-slate-300 whitespace-pre min-w-max text-left">
{`AnaMoslem/
├── app/
│   ├── src/main/
│   │   ├── java/com/example/anamoslem/
│   │   │   ├── MainActivity.kt
│   │   │   ├── fragments/
│   │   │   │   ├── HomeFragment.kt
│   │   │   │   ├── QuranFragment.kt
│   │   │   │   ├── PrayerTimesFragment.kt
│   │   │   │   ├── QiblaFragment.kt
│   │   │   │   └── SettingsFragment.kt
│   │   ├── res/
│   │   │   ├── layout/
│   │   │   ├── values/
│   │   │   ├── drawable/
│   │   │   └── menu/
│   │   └── AndroidManifest.xml
│   └── build.gradle`}
                  </div>
                </div>
              </div>
              <div className="p-5 bg-[#050A15]/50 border-t border-slate-800 flex items-start gap-4">
                 <div className="flex-1">
                   <p className="text-slate-400 text-sm leading-relaxed" dir="rtl">
                      هذه الخريطة تمثل مجلدات وهيكلة التطبيق في برنامج <span className="font-semibold text-cyan-400">Android Studio</span> باستخدام Kotlin.
                   </p>
                 </div>
              </div>
            </motion.div>

            {/* Card 3: First Code Snippet */}
            <CodeCard 
              title="أول برنامج Kotlin"
              filename="Console.kt"
              code={snippet1}
              icon={Terminal}
              iconColor="text-blue-400"
              delay={0.1}
              description={
                <>انسخ هذا الكود لتجربته في شاشة الـ Console للتأكد من أن <span className="font-semibold text-cyan-400">JDK</span> يعمل بكفاءة.</>
              }
            />

            {/* Card 4: MainActivity */}
            <CodeCard 
              title="إدارة الواجهات (MainActivity)"
              filename="MainActivity.kt"
              language="kotlin"
              code={snippet2}
              icon={Navigation}
              iconColor="text-sky-400"
              delay={0.2}
              description={
                <>هذا هو كود الشاشة الرئيسية <span className="font-semibold text-cyan-400">MainActivity</span>. يقوم هذا الكود بإدارة التنقل يدوياً (Fragment Transactions) بين الأقسام الأربعة السفلية للتطبيق: الرئيسية، القرآن، مواقيت الصلاة، المسبحة/القبلة والضبط.</>
              }
            />

            {/* Card 5: HomeFragment */}
            <CodeCard 
              title="الواجهة الرئيسية (HomeFragment)"
              filename="HomeFragment.kt"
              language="kotlin"
              code={snippet8}
              icon={Home}
              iconColor="text-indigo-400"
              delay={0.25}
              description={
                <>هذا هو كود القسم الرئيسي <span className="font-semibold text-cyan-400">HomeFragment</span>. يقوم هذا الملف بربط واجهة بطاقات الشاشة الرئيسية (كالقرآن والأذكار) وعرض رسالة للمتصفح (Toast) للتأكد من ربط الأزرار بشكل صحيح للمرحلة القادمة.</>
              }
            />

            {/* Card 5.01: fragment_home.xml */}
            <CodeCard 
              title="تصميم الواجهة الرئيسية (fragment_home.xml)"
              filename="fragment_home.xml"
              language="xml"
              code={snippet13}
              icon={FileCode2}
              iconColor="text-red-400"
              delay={0.255}
              description={
                <>هذا هو تنسيق XML للواجهة الرئيسية. يحتوي على <span className="font-semibold text-cyan-400">ScrollView</span> ليسمح بالتمرير، وبطاقة لأوقات الصلاة، وشبكة من <span className="font-mono text-cyan-400 text-xs">CardView</span> تضم الاختصارات الأساسية (القرآن، الأذكار، القبلة، إلخ).</>
              }
            />

            {/* Card 5.1: QuranFragment */}
            <CodeCard 
              title="واجهة القرآن الكريم (QuranFragment)"
              filename="QuranFragment.kt"
              language="kotlin"
              code={snippet9}
              icon={BookOpen}
              iconColor="text-emerald-400"
              delay={0.26}
              description={
                <>الملف البرمجي لقسم <span className="font-semibold text-cyan-400">القرآن الكريم</span>. يحتوي على المنطق الخاص بعرض قائمة السور (RecyclerView) والتجهيز لفتح الآيات عند النقر على السورة المختارة من قائمة <span className="font-mono text-cyan-400 text-xs">fragment_quran.xml</span>.</>
              }
            />

            {/* Card 5.11: fragment_quran.xml */}
            <CodeCard 
              title="تصميم واجهة القرآن (fragment_quran.xml)"
              filename="fragment_quran.xml"
              language="xml"
              code={snippet14}
              icon={FileCode2}
              iconColor="text-emerald-300"
              delay={0.265}
              description={
                <>ملف الواجهة الخاص بـ <span className="font-semibold text-cyan-400">القرآن الكريم</span>. يستخدم <span className="font-mono text-cyan-400 text-xs">RecyclerView</span> لعرض قائمة الـ 114 سورة بشكل سلس واحترافي يسهل على المستخدم الوصول لتلاوته المفضلة.</>
              }
            />

            {/* Card 5.12: QuranApiService.kt */}
            <CodeCard 
              title="خدمة جلب البيانات (QuranApiService)"
              filename="QuranApiService.kt"
              language="kotlin"
              code={snippet18}
              icon={Network}
              iconColor="text-blue-400"
              delay={0.268}
              description={
                <>واجهة تعريف <span className="font-semibold text-cyan-400">API</span> باستخدام مكتبة <span className="font-semibold text-cyan-400">Retrofit</span>. هذا الملف مسؤول عن التواصل مع خوادم <span className="font-mono text-cyan-400 text-xs">alquran.cloud</span> لجلب قائمة السور والآيات برمجياً.</>
              }
            />

            {/* Card 5.2: PrayerTimesFragment */}
            <CodeCard 
              title="مواقيت الصلاة (PrayerTimesFragment)"
              filename="PrayerTimesFragment.kt"
              language="kotlin"
              code={snippet10}
              icon={Clock}
              iconColor="text-amber-400"
              delay={0.27}
              description={
                <>الكود الأساسي لقسم <span className="font-semibold text-cyan-400">مواقيت الصلاة</span>. سيعرض هذا الجزء واجهة الإمساكية المرتبطة بتصميم <span className="font-mono text-cyan-400 text-xs">fragment_prayer_times.xml</span> والتجهيز لربطه بخدمة الإنترنت قريباً.</>
              }
            />

            {/* Card 5.21: fragment_prayer_times.xml */}
            <CodeCard 
              title="تصميم مواقيت الصلاة (fragment_prayer_times.xml)"
              filename="fragment_prayer_times.xml"
              language="xml"
              code={snippet15}
              icon={FileCode2}
              iconColor="text-amber-200"
              delay={0.275}
              description={
                <>يُعرّف هذا الملف تصميم شاشة <span className="font-semibold text-cyan-400">مواقيت الصلاة</span>. يحتوي على قائمة خطية (LinearLayout) تعرض مواقيت الصلوات الخمس بأسلوب البطاقات المظللة والخلفيات البيضاء المتباينة لسهولة القراءة.</>
              }
            />

            {/* Card 5.22: AladhanApiService.kt */}
            <CodeCard 
              title="خدمة مواقيت الصلاة (AladhanApiService)"
              filename="AladhanApiService.kt"
              language="kotlin"
              code={snippet19}
              icon={Network}
              iconColor="text-amber-400"
              delay={0.278}
              description={
                <>واجهة برمجة تطبيقات <span className="font-semibold text-cyan-400">Aladhan API</span>. تُستخدم لجلب مواقيت الصلاة الدقيقة بناءً على إحداثيات الموقع الجغرافي (خطوط الطول والعرض) للمستخدم.</>
              }
            />

            {/* Card 5.3: QiblaFragment */}
            <CodeCard 
              title="واجهة القبلة (QiblaFragment)"
              filename="QiblaFragment.kt"
              language="kotlin"
              code={snippet11}
              icon={Compass}
              iconColor="text-teal-400"
              delay={0.28}
              description={
                <>ملف برمجة <span className="font-semibold text-cyan-400">البوصلة</span>. يستخدم حساسات التسارع والمجال المغناطيسي للهاتف لحساب اتجاه الشمال وتدوي البوصلة برمجياً لتحديد اتجاه القبلة بدقة.</>
              }
            />

            {/* Card 5.31: fragment_qibla.xml */}
            <CodeCard 
              title="تصميم البوصلة (fragment_qibla.xml)"
              filename="fragment_qibla.xml"
              language="xml"
              code={snippet20}
              icon={FileCode2}
              iconColor="text-teal-300"
              delay={0.285}
              description={
                <>واجهة <span className="font-semibold text-cyan-400">القبلة</span> البصرية. تحتوي على طبقات (FrameLayout) لتراكب صورة البوصلة مع مؤشر اتجاه الكعبة المشرفة لإرشاد المستخدم.</>
              }
            />

            {/* Card 5.4: SettingsFragment */}
            <CodeCard 
              title="قائمة الإعدادات (SettingsFragment)"
              filename="SettingsFragment.kt"
              language="kotlin"
              code={snippet12}
              icon={Settings}
              iconColor="text-slate-400"
              delay={0.29}
              description={
                <>واجهة <span className="font-semibold text-cyan-400">الإعدادات</span> الخاصة بالتطبيق. ستتيح هذه الواجهة التحكم بخصائص البرنامج مثل اختيار القارئ المفضل، طريقة حساب أوقات الصلاة، وتعديل المظهر عبر <span className="font-mono text-cyan-400 text-xs">fragment_settings.xml</span>.</>
              }
            />

            {/* Card 6: activity_main.xml */}
            <CodeCard 
              title="تخطيط الشاشة الرئيسية (activity_main.xml)"
              filename="activity_main.xml"
              language="xml"
              code={snippet3}
              icon={FileCode2}
              iconColor="text-orange-400"
              delay={0.3}
              description={
                <>تصميم الواجهة (Layout) العام المرتبط بالنشاط الأساسي. يحتوي هذا التصميم على شريط <span className="font-semibold text-cyan-400">BottomNavigationView</span> مع حاوية متغيرة لعرض المحتويات المختلفة.</>
              }
            />

            {/* Card 7: colors.xml */}
            <CodeCard 
              title="ألوان المظهر (Colors)"
              filename="colors.xml"
              language="xml"
              code={snippet4}
              icon={Palette}
              iconColor="text-amber-500"
              delay={0.4}
              description={
                <>لوحة الألوان الموحدة للمشروع. تم اختيار درجات من <span className="font-semibold text-cyan-500">سماوي</span> و<span className="font-semibold text-[#D4AF37]">الذهبي</span> لتعكس هوية بصرية إسلامية مريحة لعين المستخدم عند قراءة القرآن أو الأذكار.</>
              }
            />

            {/* Card 7.5: strings.xml */}
            <CodeCard 
              title="نصوص التطبيق (Strings)"
              filename="strings.xml"
              language="xml"
              code={snippet16}
              icon={FileCode2}
              iconColor="text-yellow-400"
              delay={0.45}
              description={
                <>ملف النصوص والمصطلحات الأساسية المستخدمة في التطبيق. تم إعطاء اسم التطبيق <span className="font-semibold text-cyan-400">المذكر</span> ليكون الاسم الرسمي الذي يظهر تحت الأيقونة في هواتف المستخدمين.</>
              }
            />

            {/* Card 7.6: themes.xml */}
            <CodeCard 
              title="سمات التطبيق (Themes)"
              filename="themes.xml"
              language="xml"
              code={snippet17}
              icon={Palette}
              iconColor="text-fuchsia-400"
              delay={0.48}
              description={
                <>ملف سمات تطبيق <span className="font-semibold text-cyan-400">المذكر</span>. يحدد هذا الملف نمط Material Components بدون شريط علوي (NoActionBar) ويقوم بربط هوية الألوان ( الأخضر الداكن والذهبي ) بالمكونات الافتراضية مثل شريط الحالة (StatusBar).</>
              }
            />

            {/* Card 8: bottom_menu.xml */}
            <CodeCard 
              title="قائمة التنقل السفلية (Menu)"
              filename="bottom_menu.xml"
              language="xml"
              code={snippet5}
              icon={Menu}
              iconColor="text-pink-400"
              delay={0.5}
              description={
                <>ملف القائمة الذي يُعرّف العناصر الخمسة الأساسية في الشريط السفلي. يربط هذا الملف بين معرّفات الشاشات (<span className="font-mono text-cyan-400 text-xs">ids</span>)، الأيقونات، والنصوص الظاهرة للمستخدم لكل قسم.</>
              }
            />

            {/* Card 9: AndroidManifest.xml */}
            <CodeCard 
              title="تصريحات التطبيق (AndroidManifest)"
              filename="AndroidManifest.xml"
              language="xml"
              code={snippet7}
              icon={Info}
              iconColor="text-green-500"
              delay={0.6}
              description={
                <>ملف الإعدادات الأساسية لبيئة الأندرويد. يشمل إعطاء صلاحيات <span className="font-semibold text-cyan-400">الإنترنت</span> لتنزيل مواقيت الصلاة، وصلاحية <span className="font-semibold text-cyan-400">الموقع</span> لتحديد القبلة، كما يُعرّف واجهة الانطلاق (<span className="font-mono text-cyan-400 text-xs">MainActivity</span>) والآيقونات واسم التطبيق.</>
              }
            />

            {/* Card 10: build.gradle */}
            <CodeCard 
              title="إعدادات ومكتبات المشروع (build.gradle)"
              filename="build.gradle (Module: app)"
              language="groovy"
              code={snippet6}
              icon={Blocks}
              iconColor="text-indigo-400"
              delay={0.7}
              description={
                <>ملف الإعدادات الرئيسي لنسخة التطبيق (<span className="font-mono text-cyan-400 text-xs">com.example.anamoslem</span>). يحتوي على تكوينات نظام بناء الأندرويد من ناحية التوافق والإصدار، وقائمة المكتبات الأساسية للتطبيق مثل: <span className="font-semibold text-cyan-400">RecyclerView</span> والتصميم، والموقع <span className="font-semibold text-cyan-400">Location Services</span> لتحديد القبلة.</>
              }
            />

            {/* Card 11: App Preview Mockup */}
            <AppPreviewMockup />
          </motion.div>
        )}

      </div>
    </div>
  );
}
