#import "DialogViewController.h"

@interface DialogViewController ()

@property (nonatomic, strong) NSString* alertText;

@end

@implementation DialogViewController


- (instancetype)initWithAlertText:(NSString*)text
{
    self = [super init];
    self.alertText = text;
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    self.modalPresentationStyle = UIModalPresentationFullScreen;
    self.popoverPresentationController.backgroundColor = [UIColor whiteColor];
    
    UILabel* lblInfo = [[UILabel alloc] init];
    lblInfo.numberOfLines = 5;
    lblInfo.text = self.alertText;
    lblInfo.textColor = [UIColor blackColor];
    [self.view addSubview:lblInfo];
    
    UIButton* btnClose = [[UIButton alloc] init];
    [btnClose setTitle:@"Close" forState:UIControlStateNormal];
    [btnClose setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
    [btnClose addTarget:self action:@selector(closeAlert) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:btnClose];
    
    [lblInfo setTranslatesAutoresizingMaskIntoConstraints:NO];
    [btnClose setTranslatesAutoresizingMaskIntoConstraints:NO];
    NSLayoutConstraint *c1 = [lblInfo.topAnchor constraintEqualToAnchor:self.view.safeAreaLayoutGuide.topAnchor constant:40];
    NSLayoutConstraint *c2 = [NSLayoutConstraint constraintWithItem:lblInfo attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:self.view attribute:NSLayoutAttributeCenterX multiplier:1 constant:0];
    NSLayoutConstraint *c3 = [NSLayoutConstraint constraintWithItem:btnClose attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:lblInfo attribute:NSLayoutAttributeBottom multiplier:1 constant:40];
    NSLayoutConstraint *c4 = [NSLayoutConstraint constraintWithItem:btnClose attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:self.view attribute:NSLayoutAttributeCenterX multiplier:1 constant:0];
    [self.view addConstraints:@[c1, c2, c3, c4]];
}

- (void)closeAlert
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

@end
