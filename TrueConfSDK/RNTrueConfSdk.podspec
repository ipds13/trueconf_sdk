Pod::Spec.new do |s|
  s.name         = "RNTrueConfSdk"
  s.version      = "1.0.0"
  s.summary      = "RNTrueConfSdk"
  s.description  = <<-DESC
                  RNTrueConfSdk
                   DESC
  s.homepage     = "RNTrueConfSdk"
  s.license      = "MIT"
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "11.0"
  s.source       = { :git => "https://github.com/author/RNTrueConfSdk.git", :tag => "master" }
  s.source_files  = "ios/*.{h,m}"
  s.requires_arc = true
  s.dependency "React"
  s.vendored_frameworks = "ios/TrueConfSDK.xcframework"
end
