USE [FOPEC]
GO
/****** Object:  Table [dbo].[address]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[address](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[line1] [varchar](255) NOT NULL,
	[line2] [varchar](255) NULL,
	[city] [varchar](255) NOT NULL,
	[state] [varchar](255) NOT NULL,
	[zip] [varchar](255) NOT NULL,
 CONSTRAINT [PK_address] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[business_focus]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[business_focus](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](255) NOT NULL,
 CONSTRAINT [PK_business_focus] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[company]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[company](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NOT NULL,
	[created] [datetime] NOT NULL,
	[last_updated] [datetime] NOT NULL,
	[person_id_created] [int] NOT NULL,
 CONSTRAINT [PK_company] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[company_business_focus]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[company_business_focus](
	[business_focus_id] [int] NOT NULL,
	[company_id] [int] NOT NULL,
 CONSTRAINT [PK_company_business_focus] PRIMARY KEY CLUSTERED 
(
	[business_focus_id] ASC,
	[company_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[company_location]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[company_location](
	[company_id] [int] NOT NULL,
	[address_id] [int] NOT NULL,
	[isHQ] [bit] NOT NULL,
 CONSTRAINT [PK_company_location] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[address_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[crowdsourced_research]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[crowdsourced_research](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[ownership_type_id] [int] NOT NULL,
	[observing_person_id] [int] NOT NULL,
	[created] [datetime] NOT NULL,
	[notes] [varchar](max) NULL,
	[parent_company_id] [int] NULL,
 CONSTRAINT [PK_crowdsourced_research] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[crowdsourced_research_vote]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[crowdsourced_research_vote](
	[crowdsourced_research_id] [int] NOT NULL,
	[person_id] [int] NOT NULL,
	[created] [datetime] NULL,
	[vote_type] [varchar](100) NOT NULL,
	[updated] [datetime] NOT NULL,
 CONSTRAINT [PK_crowdsourced_research_vote] PRIMARY KEY CLUSTERED 
(
	[crowdsourced_research_id] ASC,
	[person_id] ASC,
	[vote_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ownership_type]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ownership_type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](255) NOT NULL,
 CONSTRAINT [PK_ownership_type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[person]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[person](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](255) NOT NULL,
	[middle_name] [varchar](255) NOT NULL,
	[last_name] [varchar](255) NOT NULL,
	[username] [varchar](255) NOT NULL,
	[password] [varbinary](max) NOT NULL,
	[created] [datetime] NOT NULL,
	[is_active] [bit] NOT NULL,
 CONSTRAINT [PK_person] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[person_audit]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[person_audit](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[person_id] [int] NOT NULL,
	[first_name] [varchar](255) NOT NULL,
	[middle_name] [varchar](255) NOT NULL,
	[last_name] [varchar](255) NOT NULL,
	[username] [varchar](255) NOT NULL,
	[password] [varbinary](max) NOT NULL,
	[audit_datetime] [datetime] NOT NULL,
	[is_active] [bit] NULL,
 CONSTRAINT [PK_person_audit] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[person_login]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[person_login](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[person_id] [int] NOT NULL,
	[login_datetime] [datetime] NOT NULL,
	[last_seen_datetme] [datetime] NOT NULL,
	[user_agent_maybe] [varchar](max) NOT NULL,
 CONSTRAINT [PK_person_login] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[crowdsourced_research_vote] ADD  CONSTRAINT [DF_crowdsourced_research_vote_created]  DEFAULT (getdate()) FOR [created]
GO
ALTER TABLE [dbo].[crowdsourced_research_vote] ADD  CONSTRAINT [DF_crowdsourced_research_vote_updated]  DEFAULT (getdate()) FOR [updated]
GO
ALTER TABLE [dbo].[person] ADD  CONSTRAINT [DF_person_isActive]  DEFAULT ((1)) FOR [is_active]
GO
ALTER TABLE [dbo].[company]  WITH CHECK ADD  CONSTRAINT [FK_company_person] FOREIGN KEY([person_id_created])
REFERENCES [dbo].[person] ([id])
GO
ALTER TABLE [dbo].[company] CHECK CONSTRAINT [FK_company_person]
GO
ALTER TABLE [dbo].[company_business_focus]  WITH CHECK ADD  CONSTRAINT [FK_company_business_focus_business_focus] FOREIGN KEY([business_focus_id])
REFERENCES [dbo].[business_focus] ([id])
GO
ALTER TABLE [dbo].[company_business_focus] CHECK CONSTRAINT [FK_company_business_focus_business_focus]
GO
ALTER TABLE [dbo].[company_business_focus]  WITH CHECK ADD  CONSTRAINT [FK_company_business_focus_company] FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([id])
GO
ALTER TABLE [dbo].[company_business_focus] CHECK CONSTRAINT [FK_company_business_focus_company]
GO
ALTER TABLE [dbo].[company_location]  WITH CHECK ADD  CONSTRAINT [FK_company_location_address] FOREIGN KEY([address_id])
REFERENCES [dbo].[address] ([id])
GO
ALTER TABLE [dbo].[company_location] CHECK CONSTRAINT [FK_company_location_address]
GO
ALTER TABLE [dbo].[company_location]  WITH CHECK ADD  CONSTRAINT [FK_company_location_company] FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([id])
GO
ALTER TABLE [dbo].[company_location] CHECK CONSTRAINT [FK_company_location_company]
GO
ALTER TABLE [dbo].[crowdsourced_research]  WITH CHECK ADD  CONSTRAINT [FK_crowdsourced_research_company] FOREIGN KEY([company_id])
REFERENCES [dbo].[company] ([id])
GO
ALTER TABLE [dbo].[crowdsourced_research] CHECK CONSTRAINT [FK_crowdsourced_research_company]
GO
ALTER TABLE [dbo].[crowdsourced_research]  WITH CHECK ADD  CONSTRAINT [FK_crowdsourced_research_company1] FOREIGN KEY([parent_company_id])
REFERENCES [dbo].[company] ([id])
GO
ALTER TABLE [dbo].[crowdsourced_research] CHECK CONSTRAINT [FK_crowdsourced_research_company1]
GO
ALTER TABLE [dbo].[crowdsourced_research]  WITH CHECK ADD  CONSTRAINT [FK_crowdsourced_research_ownership_type] FOREIGN KEY([ownership_type_id])
REFERENCES [dbo].[ownership_type] ([id])
GO
ALTER TABLE [dbo].[crowdsourced_research] CHECK CONSTRAINT [FK_crowdsourced_research_ownership_type]
GO
ALTER TABLE [dbo].[crowdsourced_research]  WITH CHECK ADD  CONSTRAINT [FK_crowdsourced_research_person] FOREIGN KEY([observing_person_id])
REFERENCES [dbo].[person] ([id])
GO
ALTER TABLE [dbo].[crowdsourced_research] CHECK CONSTRAINT [FK_crowdsourced_research_person]
GO
ALTER TABLE [dbo].[crowdsourced_research_vote]  WITH CHECK ADD  CONSTRAINT [FK_crowdsourced_research_vote_crowdsourced_research] FOREIGN KEY([crowdsourced_research_id])
REFERENCES [dbo].[crowdsourced_research] ([id])
GO
ALTER TABLE [dbo].[crowdsourced_research_vote] CHECK CONSTRAINT [FK_crowdsourced_research_vote_crowdsourced_research]
GO
ALTER TABLE [dbo].[crowdsourced_research_vote]  WITH CHECK ADD  CONSTRAINT [FK_crowdsourced_research_vote_person] FOREIGN KEY([person_id])
REFERENCES [dbo].[person] ([id])
GO
ALTER TABLE [dbo].[crowdsourced_research_vote] CHECK CONSTRAINT [FK_crowdsourced_research_vote_person]
GO
ALTER TABLE [dbo].[person_audit]  WITH CHECK ADD  CONSTRAINT [FK_person_audit_person] FOREIGN KEY([person_id])
REFERENCES [dbo].[person] ([id])
GO
ALTER TABLE [dbo].[person_audit] CHECK CONSTRAINT [FK_person_audit_person]
GO
ALTER TABLE [dbo].[person_login]  WITH CHECK ADD  CONSTRAINT [FK_person_login_person] FOREIGN KEY([person_id])
REFERENCES [dbo].[person] ([id])
GO
ALTER TABLE [dbo].[person_login] CHECK CONSTRAINT [FK_person_login_person]
GO
ALTER TABLE [dbo].[crowdsourced_research_vote]  WITH CHECK ADD  CONSTRAINT [chk_vote_type] CHECK  (([vote_type]='down' OR [vote_type]='up'))
GO
ALTER TABLE [dbo].[crowdsourced_research_vote] CHECK CONSTRAINT [chk_vote_type]
GO
/****** Object:  Trigger [dbo].[trg_insteadOfDelete_person]    Script Date: 5/3/2025 1:17:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create trigger [dbo].[trg_insteadOfDelete_person]
on [dbo].[person]
instead of delete
as
begin
    set nocount on;

	 if (select count(id) from deleted) > 1
	begin 
		print('Not allowing delete of > 1 person at this time')

	end else begin
		print('here now')
		declare @id int = (select id from deleted);

		update company
		set person_id_created = 0
		where person_id_created = @id;

		update crowdsourced_research_vote
		set person_id = 0
		where person_id = @id;

		update crowdsourced_research
		set observing_person_id = 0
		where observing_person_id = @id;

		
		exec updPersonAudit @id = @id 

		delete from person
		where id in (select id from deleted);
	end
end
GO
ALTER TABLE [dbo].[person] ENABLE TRIGGER [trg_insteadOfDelete_person]
GO
/****** Object:  Trigger [dbo].[trg_person_audit]    Script Date: 5/3/2025 1:18:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create trigger [dbo].[trg_person_audit]
on [dbo].[person]
after update
as
begin
	set nocount on;

	insert into person_audit (
		person_id,
		first_name,
		middle_name,
		last_name,
		username,
		password,
		audit_datetime,
		is_active
	)
	select 
		id,
		first_name,
		middle_name,
		last_name,
		username,
		password,
		getdate(),
		is_active
	from deleted;
end
GO
ALTER TABLE [dbo].[person] ENABLE TRIGGER [trg_person_audit]
GO
